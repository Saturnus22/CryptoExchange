import React, { Component } from 'react'
import voodoologo from '../voodoologo.png'
import ethlogo from '../ethlogo.png'
import BuyForm from './BuyForm.js'
import SellForm from './SellForm.js'

class Main extends Component {
  constructor (props){
    super(props)
    this.state = {
      currentState : 'sell'

    }
  }

  render() {
    let content = ''



    if(this.state.currentState==='buy'){
      content = <BuyForm Main ethBalance = {this.props.ethBalance} voodooBalance={this.props.voodooBalance} buyTokens={this.props.buyTokens}/>
    }else{
      content = <SellForm Main ethBalance = {this.props.ethBalance} voodooBalance={this.props.voodooBalance} sellTokens={this.props.sellTokens}/>
    }
    return (
      <div id = "content">
        <div className="d-flex justify-content-between mb-3">
            <button className='btn-btn-light' onClick={(event)=>{
              this.setState({currentState:'buy'})
              }}> Buy! </button>
            <button className='btn-btn-light' onClick={(event)=>{
              this.setState({currentState:'sell'})
              }}> Sell! </button>
          </div>
        <div className = "card mb-4">
            <div className = "card-body">
            {content}
            </div>
        </div>
      </div>
    );
  }
}

export default Main;
