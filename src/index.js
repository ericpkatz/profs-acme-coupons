import React from 'react';
import ReactDOM from 'react-dom';
import store, { setCoupons, setProducts } from './store';
const root = document.querySelector('#root');
ReactDOM.render(<hr />, root);

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

store.subscribe(()=> {
  /*
  const { products, coupons } = store.getState();
  console.log(products);
  console.log(coupons);
  */
  const viewData = mapper(store.getState());
  viewData.products.forEach( product => {
    console.log(product.name);
    console.log(viewData.productMap[product.id]);
  })
  console.log(viewData);
});
