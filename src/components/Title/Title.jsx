import React from 'react';
import styled from 'styled-components';

const Currency = styled.div`
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  padding: 10px 0;
`;

const CurrencyList = styled.div`
`;

const Order = styled.div`
  width: calc(100%/22*2 - 5px);
  text-align: center;
`;

const CoinName = styled.div`
  width: calc(100%/22*8 - 5px);
  text-align: left;
  
`;

const Price = styled.div`
  text-align: right;
  width: calc(100%/22*2 - 5px);
`;

const OneDay = styled.div`
  width: calc(100%/22*2 - 5px);
  text-align: right;
`;

const SevenDays = styled.div`
  width: calc(100%/22*2 - 5px);
  text-align: right;
`;

const Volume = styled.div`
  width: calc(100%/22*3 - 5px);
  text-align: right;
  padding-right: 15px;
`;

const MarketCap = styled.div`
  width: calc(100%/22*3 - 5px);
  text-align: right;
`;

class Title extends React.Component {
  render() {

    return (
      <CurrencyList>
          <Currency>
            <Order>#</Order>
            <CoinName>CoinName</CoinName>
            <Price>Price</Price>
            <OneDay>1d</OneDay>
            <SevenDays>7d</SevenDays>
            <Volume>Volume</Volume>
            <MarketCap>MarketCap</MarketCap>
          </Currency>
      </CurrencyList>
    );
  }
}

export default Title;