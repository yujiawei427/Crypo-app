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

const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T13:00:00.000+00:00`;
const assumToday = '2019-12-03T13:00:00.000+00:00'; //assume Dec 04,2019 is today
const assumYesterday = '2019-12-02T13:00:00.000+00:00';
const assumSevenday = '2019-11-26T13:00:00.000+00:00';
const url = `https://crypo-api.herokuapp.com/currencies/${assumToday}`;
const yesterdayUrl = `https://crypo-api.herokuapp.com/currencies/${assumYesterday}`;
const sevendayUrl = `https://crypo-api.herokuapp.com/currencies/${assumSevenday}`;

const calcDifference = (current, old) => {
  return (current - old)/current ;
};


const matchHistory = (name, list) => (
  list.reduce((result, element) => {
    if (element.Currency === name)
      result = result + element.Close;
    return result;
  }, '')
);

const beNum = (number) => {
  return Number(number.split(',').join(''));
};

const setList = (list, yesterdayList, sevendayList) => {
  let newList = [];
  list.map(element => {
    const yesterdayClose = matchHistory(element.Currency, yesterdayList);
    const sevendayClose = matchHistory(element.Currency, sevendayList);
    console.log(element.Currency);
    newList.push({});
    const newListLength = newList.length - 1;
    newList[newListLength].coinName = element.Currency;
    newList[newListLength].price = beNum(element.Close);
    newList[newListLength].marketCap = beNum(element['Market Cap']);
    newList[newListLength].volume = beNum(element.Volume);
    newList[newListLength].oneDay = calcDifference(beNum(element.Close) ,beNum(yesterdayClose));
    newList[newListLength].sevenDays = calcDifference(beNum(element.Close) ,beNum(sevendayClose));
  });
  return newList;
};

const listOrder = (list) => {
  for (let i = 0, temp; i < list.length - 1; i++) {
    for (let j = 0; j < list.length - 1 - i; j++) {
      if (list[j].marketCap < list[j+1].marketCap) {
        temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
      }
    }
  }
};

// const listOrder = (list) => {
//   const result = [];
//   list.map
// }

const addSerial = (list) => {
  let i = 0;
  list.map(element => {
    element.order = i + 1;
    i++;
  })
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
