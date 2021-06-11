const voodooToken = artifacts.require("Token");
const voodooSwap = artifacts.require("voodooSwap");

  require('chai')
  .use(require('chai-as-promised'))
  .should()
function tokensinWei (n){
  return web3.utils.toWei(n,'ether');
}

contract ('voodooSwap',([deployer,investor])=>{
  let token,voodoo

  before(async()=>{
     token = await voodooToken.new()
     voodoo = await voodooSwap.new(token.address)
    await token.transfer(voodoo.address,tokensinWei("1000000"))
  })

    describe('VooDooToken Deployment', async ()=>{
    it('Token has a name',async()=>{

      const name = await token.name()
      assert.equal(name,'VooDooTok')
    })
  })
    describe('VooDooSwap Deployment', async ()=>{
      it('contract has a name',async()=>{

        const name = await voodoo.name()
        assert.equal(name,'voodooSwap Instant Exchange')
      })
      it ('contract has tokens',async()=>{


        let balance = await token.balanceOf(voodoo.address)
        assert.equal(balance.toString(),'1000000000000000000000000')
      })

    })
    describe('BuyTokens()',async()=>{
      let results
      before(async()=>{
        //buytokens befor each example
        results = await voodoo.buytokens({from : investor,value : web3.utils.toWei('1','ether')
      })})
      it('Allows user to buy tokens',async()=>{
        let investorBalance = await token.balanceOf(investor)

        assert.equal(investorBalance.toString(),tokensinWei('100'))
        let voodooSwapBalance
        voodooSwapBalance = await token.balanceOf(voodoo.address)

        assert.equal(voodooSwapBalance,tokensinWei('999900'))
        voodooSwapBalance = await web3.eth.getBalance(voodoo.address)

        assert.equal(voodooSwapBalance,web3.utils.toWei("1",'ether'))


        const event = results.logs[0].args
        assert.equal(event.account,investor)
         assert.equal(event.token,token.address)
        assert.equal(event.amount.toString(),tokensinWei('100').toString())
        assert.equal(event.rate.toString(),'100')

        })

      })

      describe('sellTokens()',async()=>{
        let results
        before(async()=>{
          //buytokens befor each example
          await token.approve(voodoo.address,tokensinWei('100'),{from:investor})
          results = await voodoo.sellTokens(tokensinWei('100'),{from:investor})

                  })

        it('Allows user to sell tokens',async()=>{
          let investorBalance = await token.balanceOf(investor)

          assert.equal(investorBalance.toString(),tokensinWei('0'))
          let voodooSwapBalance
          voodooSwapBalance = await token.balanceOf(voodoo.address)

          assert.equal(voodooSwapBalance,tokensinWei('1000000'))
          voodooSwapBalance = await web3.eth.getBalance(voodoo.address)

          assert.equal(voodooSwapBalance,web3.utils.toWei("0",'ether'))
          const event = results.logs[0].args
          assert.equal(event.account,investor)
           assert.equal(event.token,token.address)
          assert.equal(event.amount.toString(),tokensinWei('100').toString())
          assert.equal(event.rate.toString(),'100')

          await voodoo.sellTokens(tokensinWei('500'),{from:investor}).should.be.rejected;





        })
            })
                })
