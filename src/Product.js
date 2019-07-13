import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createCoupon } from './store';

const _Product = ({ product, coupons, addCoupon })=> {
  if(!product){
    return null;
  }
  return (
    <div>
      {
        <h2>{ product.name }</h2>
      }
      <ul>
      {
        coupons.map( coupon => <li key={ coupon.id }>{ coupon.name }</li>)
      }
      </ul>
      <button onClick={ addCoupon }>Add Random Coupon</button>
    </div>
  );
};

const mapStateToProps = ({ products, coupons }, { match })=> {
  const product = products.find(product => product.id === match.params.id);
  return {
    product,
    coupons: coupons.filter( coupon => coupon.productId === match.params.id )
  };
};

const mapDispatchToProps = (dispatch, { match })=> {
  return {
    addCoupon: ()=> dispatch(createCoupon(match.params.id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_Product);
