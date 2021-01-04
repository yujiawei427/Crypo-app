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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  componentDidMount() {
    //has already pushed to heroku if not works use localhost: http://localhost:3001/currency
    fetch('https://crypo-api.herokuapp.com/currency') 
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
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
        </div>
      </Layout>
      );
    }
  }
}

export default App;
