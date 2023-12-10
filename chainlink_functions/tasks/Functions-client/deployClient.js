const { types } = require("hardhat/config")
const { networks } = require("../../networks")

task("functions-deploy-client", "Deploys the GuardRiskTestToken, GuardRiskStaking, GuardRiskInsurance contracts")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate an FunctionsConsumer request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying GuardRiskTestToken, GuardRiskStaking, GuardRiskInsurance contracts to ${network.name}`)
    console.log("\n__Compiling Contracts__")
    await run("compile")
    // Deploy test token
    const testTokenContractFactory = await ethers.getContractFactory("GuardRiskTestToken")
    const testTokenContract = await testTokenContractFactory.deploy()
    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${
        testTokenContract.deployTransaction.hash
      } to be confirmed...`
    )
    await testTokenContract.deployTransaction.wait(networks[network.name].confirmations)
    console.log(`\nGuardRiskTestToken contract deployed to ${testTokenContract.address} on ${network.name}`)
    // Deploy Insurance
    const guardRiskInsuranceContractFactory = await ethers.getContractFactory("GuardRiskInsurance")
    const guardRiskInsuranceContract = await guardRiskInsuranceContractFactory.deploy(testTokenContract.address)
    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${
        guardRiskInsuranceContract.deployTransaction.hash
      } to be confirmed...`
    )
    await guardRiskInsuranceContract.deployTransaction.wait(networks[network.name].confirmations)
    console.log(`\nGuardRiskInsurance contract deployed to ${guardRiskInsuranceContract.address} on ${network.name}`)
    //Deploy staking
    const guardRiskStakingContractFactory = await ethers.getContractFactory("GuardRiskStaking")
    const guardRiskStakingContract = await guardRiskStakingContractFactory.deploy()
    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${
        guardRiskStakingContract.deployTransaction.hash
      } to be confirmed...`
    )
    await guardRiskStakingContract.deployTransaction.wait(networks[network.name].confirmations)
    console.log(`\nGuardRiskStaking contract deployed to ${guardRiskStakingContract.address} on ${network.name}`)
  })
