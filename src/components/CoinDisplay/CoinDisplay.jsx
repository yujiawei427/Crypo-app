import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Currency = styled.div`
  display: flex;
  justify-content: space-around;
  font-weight: 300;
  padding: 10px 0;
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
  color: #4eaf0a;

  ${(props) => {
    if (props.oneDay < 0) {
      return css` 
        color: #e15241;
      `;
    };
  }}
`;

const SevenDays = styled.div`
  width: calc(100%/22*2 - 5px);
  text-align: right;
  color: #4eaf0a;

  ${(props) => {
    if (props.sevenDays < 0) {
      return css` 
        color: #e15241;
      `;
    };
  }}
`;

const Volume = styled.div`
  width: calc(100%/22*3 - 5px);
  text-align: right;
`;

const MarketCap = styled.div`
  width: calc(100%/20*3 - 5px);
  text-align: right;
`;

class CoinDisplay extends React.Component {
  render() {
    const {order, coinName, price, oneDay, sevenDays, volume, marketCap} = this.props;

    return (
      <>
        <Currency>
          <Order>{order}</Order>
          <CoinName>{coinName}</CoinName>
          <Price>{price}</Price>
          <OneDay oneDay={oneDay}>{`${(oneDay*100).toFixed(2)}%`}</OneDay>
          <SevenDays sevenDays={sevenDays}>{`${(sevenDays*100).toFixed(2)}%`}</SevenDays>
          <Volume>${volume.toLocaleString()}</Volume>
          <MarketCap>${marketCap.toLocaleString()}</MarketCap>
        </Currency>
        <hr/>
      </>
    );
  }
}

CoinDisplay.propTypes = {
  order: PropTypes.number.isRequired,
  coinName: PropTypes.string.isRequired,
  oneDay: PropTypes.number.isRequired,
  sevenDays: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  marketCap: PropTypes.number.isRequired,
};

export default CoinDisplay;