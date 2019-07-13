import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import store from './store';
const root = document.querySelector('#root');

ReactDOM.render(<Provider store={ store }><App /></Provider>, root);

const mapper = ({ coupons, products })=> {
  const productMap = coupons.reduce((acc, coupon)=> {
    if(!acc[coupon.productId]){
      acc[coupon.productId] = [];
    }
    acc[coupon.productId].push(coupon);
    return acc;
  }, {});
  return {
    products,
    productMap
  };
};
