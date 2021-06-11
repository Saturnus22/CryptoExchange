const voodooToken = artifacts.require("Token");
const voodooSwap = artifacts.require("voodooSwap");

module.exports = async function(deployer) {

  await deployer.deploy(voodooToken);
  //const tokend = await Token.deployed();
  const token = await voodooToken.deployed()

  await deployer.deploy(voodooSwap,token.address);
   const voodooswap = await voodooSwap.deployed()
  //const vooDooSwap = await voodooSwap.deployed();
  await token.transfer(voodooswap.address,'1000000000000000000000000')
//  await tokend.transfer(vooDooSwap.address,'1000000000000000000000000')
};
