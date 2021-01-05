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
const assumToday = `2019-12-03T13:00:00.000+00:00` //assume Dec 04,2019 is today
const assumYesterday = `2019-12-02T13:00:00.000+00:00`
const assumSevenday = `2019-11-26T13:00:00.000+00:00`
const url = `https://crypo-api.herokuapp.com/currencies/` + assumToday;
const yesterdayUrl = `https://crypo-api.herokuapp.com/currencies/` + assumYesterday;
const sevendayUrl = `https://crypo-api.herokuapp.com/currencies/` + assumSevenday;


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
      return (
        <Layout>
        <Head>TOP Coins by Market Cap</Head>
        <Title/>
        <hr/>
        <CoinDisplay lists={lists} />
        <hr/>
        <div>
          {console.log(todayCurrency[0].Open)}
        </div>
      </Layout>
      );
    }
  }
}

export default App;
