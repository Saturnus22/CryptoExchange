import React, { Component } from 'react'
import voodoologo from '../voodoologo.png'
import ethlogo from '../ethlogo.png'

class BuyForm extends Component {
  constructor (props){
    super(props)
    this.state = {
      output : '0'

    }
  }
  render() {

    return (
      <form className ="mb-3" onSubmit={(event=>{


            event.preventDefault()
            let etherAmount = this.input.value.toString()
            etherAmount = window.web3.utils.toWei(etherAmount,'Ether')
            this.props.buyTokens(etherAmount)})}>
          <div >
              <label className = "float-left"><b>Input</b></label>
                  <span className= "float-right-text-muted">
                      Balance :{window.web3.utils.fromWei(this.props.ethBalance,"Ether")}
                  </span>
          </div>
          <div className = "input-group-mb-4">
            <input
                type ="text"
                onChange={(event)=>{
                  console.log(this.input.value.toString()*100)
                  this.setState({output:this.input.value.toString()*100})
                  }}
                ref={(input)=>{this.input=input}}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                <img src={ethlogo} height="32" alt=" "/>
                Eth
                </div>
              </div>
          </div>

          <div >
            <label className = "float-left"><b>output</b></label>
              <span className= "float-right-text-muted">
              Balance :{window.web3.utils.fromWei(this.props.voodooBalance,"Ether")}
              </span>
          </div>
          <div className = "input-group-mb-2">
              <input
                      type ="text"
                      className="form-control form-control-lg"
                      placeholder={this.state.output}
                      disabled />
                  <div className="input-group-append">
                      <div className="input-group-text  ">
                      <img className ="" src={voodoologo} height="32" alt=" "/>
                      voodoo
                      </div>
                  </div>
          </div>
          <div className ="mb-5">
              <span className="float-left-text-muted"> Exchange Rate</span>
              <span className="float-left-text-muted"> 1 Eth = 100 VooDooTokens</span>
          </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg"> SWAP </button>
        </form>

    );
  }
}

export default BuyForm;
