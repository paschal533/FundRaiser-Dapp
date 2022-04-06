const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", accounts => {
  let fundraiser;
  const name = "custodian name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekikken.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = accounts[1];
  const owner = accounts[0];

  beforeEach ( async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      owner
    );
  });

  describe("initialization", () => {
    it("gets the beneficiary name", async () => {
      const actaul = await fundraiser.name();
      assert.equal(actaul, name, "name should match");
    });

    it("gets the beneficiary url", async () => {
      const actaul = await fundraiser.url();
      assert.equal(actaul, url, "url should match");
    });

    it("gets the beneficiary imageURL", async () => {
      const actaul = await fundraiser.imageURL();
      assert.equal(actaul, imageURL, "imageURL should match");
    });

    it("gets the beneficiary description", async () => {
      const actaul = await fundraiser.description();
      assert.equal(actaul, description, "description should match");
    });

    it("gets the beneficiary", async () => {
      const actaul = await fundraiser.beneficiary();
      assert.equal(actaul, beneficiary, "beneficiary should match");
    });

    it("gets the owner", async () => {
      const actaul = await fundraiser.owner();
      assert.equal(actaul, owner, "owner should match");
    });
  });

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2];

    it("update beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, {from: owner});
      const actualBeneficiary = await fundraiser.beneficiary();
      assert.equal(actualBeneficiary, newBeneficiary, "beneficiary should match");
    });

    it("throws an error when called from a non-owner account", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, {from: accounts[3]});
        assert.fail("withdraw was not restricted to owners")
      } catch(err) {
        const expectedError = "Ownable: caller is not the owner"
        const actualError = err.reason;
        assert.equal(actualError, expectedError, "should not be permitted")
      }
    })
  })

  describe("making donations", () => {
    const value = web3.utils.toWei("0.0289");
    const donor = accounts[2];

    it("increase myDonationsCount", async () => {
      const currentDonationsCount = await fundraiser.myDonationsCount({from: donor});

      await fundraiser.donate({from: donor, value});

      const newDonationsCount = await fundraiser.myDonationsCount({from: donor});

      assert.equal(1, newDonationsCount - currentDonationsCount, "DonationsCount should increment by 1");
    });
    it("includes donation in myDonations", async () => {
      await fundraiser.donate({from: donor, value});
      const {values, dates} = await fundraiser.myDonations({from: donor});

      assert.equal(value, values[0], "values should match");
      assert(dates[0], "date should be present");
    })
  })
});
