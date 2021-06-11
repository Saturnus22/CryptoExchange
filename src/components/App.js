import React, { Component } from 'react'
import logo from '../doll.png'
import './App.css'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import VoodooSwap from '../abis/voodooSwap.json'
import Navbar from './Navbar'
import Main from './main.js'
class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()


  }
    async loadBlockChainData(){
      const web3 = window.web3
      const account = await  web3.eth.getAccounts()
      this.setState({account : account[0]})
      const balance = await web3.eth.getBalance(this.state.account)
      this.setState({accountBalance : balance})


      const networkId= await web3.eth.net.getId()
      const tokenData= Token.networks[networkId]
      if(tokenData){

        const token = new web3.eth.Contract(Token.abi,tokenData.address)
        this.setState({token})
        let tokenBalance = await token.methods.balanceOf(this.state.account).call()
        console.log(tokenBalance.toString())
        this.setState({accounttokenBalance:tokenBalance.toString()})


      }else{
        window.alert('token not connected')
      }


      const voodooSwapData= VoodooSwap.networks[networkId]
      if(tokenData){

        const voodooSwap = new web3.eth.Contract(VoodooSwap.abi,voodooSwapData.address)
        this.setState({voodooSwap})

      }else{
        window.alert('VooDooswap Is not Conected')
      }



    }
    async loadWeb3(){
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('non-ethereum browser detected!')
    }
    this.setState({loading:false})
    }

    buyTokens = (etherAmount=>{
      this.setState({loading:true})
      this.state.voodooSwap.methods.buytokens.send({from:this.state.account ,value:etherAmount }).on('transactionHash',(hash)=>{
        this.setState({loading:false})
      })
    })

    sellTokens = (tokensAmount=>{
      this.setState({loading:true})
      this.state.token.methods.approve(this.state.voodooSwap.address,tokensAmount).send({from:this.state.account}).on('transactionHash',(hash)=>{
        this.state.voodooSwap.methods.sellTokens(tokensAmount).send({from:this.state.account}).on('transactionHash',(hash)=>{
        this.setState({loading:false})
      })
      })

    })


    constructor (props){
      super(props)
      this.state = {
        voodooSwap : {},
        token :{},
        account : '',
        accountBalance:'0',
        accounttokenBalance:'',
        loading :true
      }
    }
  render() {
    let content
    if(this.state.loading){
      content =   <h1>Loading The Page</h1>
    }else{

      content =    <Main ethBalance = {this.state.accountBalance} voodooBalance={this.state.accounttokenBalance} buyTokens={this.buyTokens} sellTokens={this.sellTokens}/>

    }

    return (

      <div>
      <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth :'600px'}}>
              <div className="content mr-auto ml-auto">

                <center><h1 className="col-lg-12 ml-auto mr-auto">VooDooSwap</h1></center>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
