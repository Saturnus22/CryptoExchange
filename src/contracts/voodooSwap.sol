pragma solidity ^0.5.0;
import "./Token.sol";


contract voodooSwap {

      string public name = "voodooSwap Instant Exchange";
      Token public token;
      uint rate = 100;

      constructor (Token _token) public {
        token = _token;
      }
      event BuyTokens (address account,address token,uint amount,uint rate);
      event SellTokens (address account,address token,uint amount,uint rate);


      function buytokens()public payable{
        require(token.balanceOf(address(this))>=msg.value);

        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender,tokenAmount);
        emit BuyTokens(msg.sender,address(token),tokenAmount,rate);

      }

      function sellTokens(uint _amount)public {
        require(token.balanceOf(msg.sender)>=_amount);
        uint tokenAmount = _amount/rate;
        require(address(this).balance >=tokenAmount);
        token.transferFrom(msg.sender,address(this),_amount);
        msg.sender.transfer(tokenAmount);
        emit BuyTokens(msg.sender,address(token),_amount,rate);





      }


}
