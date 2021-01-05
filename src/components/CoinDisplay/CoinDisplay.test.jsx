import React from 'react';
import { shallow } from 'enzyme';
import CoinDisplay from './CoinDisplay';

describe('<CoinDisplay />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow((
      <CoinDisplay 
      order= {1}
      coinName="tenzos"
      price= {1.25}
      oneDay= {-0.023}
      sevenDays= {0.078}
      volume= {46048752}
      marketCap= {824588509}
      />
    ))
  });

  it('renders order', () => {
    expect(wrapper.find('[data-testid="order"]').text()).toBe('1');
  });

  it('renders coinName', () => {
    expect(wrapper.find('[data-testid="coinName"]').text()).toBe('tenzos');
  });

  it('renders price', () => {
    expect(wrapper.find('[data-testid="price"]').text()).toBe('1.25');
  });

  it('renders oneDay', () => {
    expect(wrapper.find('[data-testid="oneDay"]').text()).toBe('-2.30%');
  });

  it('renders sevenDays', () => {
    expect(wrapper.find('[data-testid="sevenDays"]').text()).toBe('7.80%');
  });

  it('renders volume', () => {
    expect(wrapper.find('[data-testid="volume"]').text()).toBe('$46,048,752');
  });

  it('renders marketCap', () => {
    expect(wrapper.find('[data-testid="marketCap"]').text()).toBe('$824,588,509');
  });
})  