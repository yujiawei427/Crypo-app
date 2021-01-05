import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

const Currency = styled.div`
  display: flex;
  justify-content: space-around;
  font-weight: 300;
  padding: 10px 0;
`;

const CurrencyList = styled.div`
  list-style: none;
`;

const CurrencyItem = styled.ul`
  margin-left: -40px;
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
  color: #e15241;

  ${({ list }) => (list.oneDay >= 0) && css` 
        color: #4eaf0a;
      `}
`;

const SevenDays = styled.div`
  width: calc(100%/22*2 - 5px);
  text-align: right;
  color: #e15241;

  ${({ list }) => (list.sevenDays >= 0) && css` 
        color: #4eaf0a;
      `}
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
    const {lists} = this.props;

    return (
      <>
        <CurrencyList>
          {lists.map((list) => (
            <CurrencyItem key={list.coinName}>
              <Currency>
                <Order>{list.order}</Order>
                <CoinName>{list.coinName}</CoinName>
                <Price>{list.price}</Price>
                <OneDay>{`${(list.oneDay*100).toFixed(2)}%`}</OneDay>
                <SevenDays>{`${(list.sevenDays*100).toFixed(2)}%`}</SevenDays>
                <Volume>${list.volume.toLocaleString()}</Volume>
                <MarketCap>${list.marketCap.toLocaleString()}</MarketCap>
              </Currency>
            </CurrencyItem>
          ))}
        </CurrencyList>
      </>
    );
  }
}

CoinDisplay.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    Order: PropTypes.number,
    coinName: PropTypes.string,
    oneDay: PropTypes.number,
    sevenDays: PropTypes.number,
    price: PropTypes.number,
    volume: PropTypes.number,
    marketCap: PropTypes.number,
  }).isRequired).isRequired
};

export default CoinDisplay;