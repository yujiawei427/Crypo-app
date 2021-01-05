import React from 'react';
import styled from 'styled-components';
import CoinDisplay from './components/CoinDisplay';
import Title from './components/Title';

const Layout = styled.div`
  margin: 0 calc(10%);
`;

const Head = styled.h1`
  text-align: center;
`;

const CurrencyList = styled.div`
  list-style: none;
`;

const CurrencyItem = styled.ul`
  margin-left: -40px;
`;

const lists = [{
  order: 1,
  coinName: "tezos",
  price: 1.25,
  oneDay: 0.023,
  sevenDays: 0.078,
  volume: 46048752,
  marketCap: 824588509
}, {
  order: 2,
  coinName: "bitcoin",
  price: 7320.13,
  oneDay: 0.1,
  sevenDays: 0.07,
  volume: 21664240918,
  marketCap: 131143073943
}, {
  order: 3,
  coinName: "bnb",
  price: 15.28,
  oneDay: 0.9,
  sevenDays: 0.19,
  volume: 237605471,
  marketCap: 2376597490
}
];

const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T13:00:00.000+00:00`;
const assumToday = `2019-12-03T13:00:00.000+00:00`; //assume Dec 04,2019 is today
const assumYesterday = `2019-12-02T13:00:00.000+00:00`;
const assumSevenday = `2019-11-26T13:00:00.000+00:00`;
const url = `https://crypo-api.herokuapp.com/currencies/` + assumToday;
const yesterdayUrl = `https://crypo-api.herokuapp.com/currencies/` + assumYesterday;
const sevendayUrl = `https://crypo-api.herokuapp.com/currencies/` + assumSevenday;

const calcDifference = (current, old) => {
  return (current - old)/current ;
};

const matchHistory = (name, list) => {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].Currency === name)
      return list[i].Close;
  }
};

const beNum = (number) => {
  return Number(number.split(",").join(""));
};

const setList = (list, yesterdayList, sevendayList) => {
  let newList = [];
  let i;
  for (i = 0; i < list.length; i++) {
    newList.push({});
    newList[i].coinName = list[i].Currency;
    newList[i].price = beNum(list[i].Close);
    newList[i].marketCap = beNum(list[i]["Market Cap"]);
    newList[i].volume = beNum(list[i].Volume);
    newList[i].oneDay = calcDifference(beNum(list[i].Close) ,beNum(matchHistory(list[i].Currency, yesterdayList)));
    newList[i].sevenDays = calcDifference(beNum(list[i].Close) ,beNum(matchHistory(list[i].Currency, sevendayList)));
    
  }

  return newList
};

const listOrder = (list) => {
  let temp, i, j;
  for (i = 0; i < list.length - 1; i++) {
    for (j = 0; j < list.length - 1 - i; j++) {
      if (list[j].marketCap < list[j+1].marketCap) {
        temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
      }
    }
  }
};

const addSerial = (list) => {
  let i;
  for (i = 0; i < list.length; i++) {
    list[i].order = i + 1;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isTodayLoaded: false,
      isYesterdayLoaded: false,
      isSevendayLoaded: false,
      todayCurrency: [],
      yesterdayCurrency: [],
      sevendayCurrency: [],
    };
  }

  componentDidMount() {

    //has already pushed to heroku if not works use localhost: http://localhost:3001/currency
    
    fetch(url) 
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isTodayLoaded: true,
            todayCurrency: result
          });
        },
        (error) => {
          this.setState({
            isTodayLoaded: true,
            error
          });
        }
      )

      fetch(yesterdayUrl) 
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isYesterdayLoaded: true,
            yesterdayCurrency: result
          });
        },
        (error) => {
          this.setState({
            isYesterdayLoaded: true,
            error
          });
        }
      )

      fetch(sevendayUrl) 
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isSevendayLoaded: true,
            sevendayCurrency: result
          });
        },
        (error) => {
          this.setState({
            isSevendayLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error,
      isTodayLoaded,
      todayCurrency,
      isYesterdayLoaded,
      yesterdayCurrency,
      isSevendayLoaded,
      sevendayCurrency 
    } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!(isTodayLoaded && isYesterdayLoaded && isSevendayLoaded)) {
      return <div>Loading...</div>;
    } else {
      const newList = setList(todayCurrency, yesterdayCurrency, sevendayCurrency);
      listOrder(newList);
      addSerial(newList);

      return (
        <Layout>
        <Head>TOP Coins by Market Cap</Head>
        <Title/>
        <hr/>
        <CurrencyList>
          {newList.map((list) => (
            <CurrencyItem key={list.coinName}>
              <CoinDisplay 
              order={list.order}
              coinName={list.coinName} 
              price={list.price} 
              oneDay={list.oneDay}
              sevenDays={list.sevenDays}
              volume={list.volume} 
              marketCap={list.marketCap} 
              />
            </CurrencyItem>
          ))}
        </CurrencyList>          
      </Layout>
      );
    }
  }
}

export default App;
