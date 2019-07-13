import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_COUPONS = 'SET_COUPONS';
const SET_PRODUCTS = 'SET_PRODUCTS';

const productsReducer = (state = [], action)=> {
  switch(action.type){
    case SET_PRODUCTS:
      return action.products;
  }
  return state;
};

const couponsReducer = (state = [], action)=> {
  switch(action.type){
    case SET_COUPONS:
      return action.coupons;
  }
  return state;
};

const reducer = combineReducers({
  products: productsReducer,
  coupons: couponsReducer
});

const _setProducts = (products)=> ({
  type: SET_PRODUCTS,
  products
});

const _setCoupons = (coupons)=> ({
  type: SET_COUPONS,
  coupons
});

const setProducts = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/products');
    return dispatch(_setProducts(response.data));
  };
};

const setCoupons = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/coupons');
    return dispatch(_setCoupons(response.data));
  };
};


const store = createStore(reducer, applyMiddleware(thunk));

/*
store.dispatch(_setCoupons([1, 2, 3]));
store.dispatch(_setProducts([1, 2, 3]));
*/

export default store;
export { setProducts, setCoupons };
