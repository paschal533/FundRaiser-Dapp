const FundraiserContract = artifacts.require("Fundraiser");

contract("Fundraiser", accounts => {
  let fundraiser;
  const name = "custodian name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekikken.com/600/350";
  const description = "Beneficiary description";
  const beneficiary = accounts[1];
  const owner = accounts[0];

  describe("initialization", () => {
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
});
