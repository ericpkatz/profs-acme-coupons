import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const _Products = ({ products })=> {
  return (
    <ul>
      {
        products.map( product => <li key={ product.id }>
          <Link to={`/products/${product.id}`}>{ product.name }</Link>
        </li>)
      }
    </ul>
  );
};

const mapStateToProps = ({ products, coupons })=> {
  return {
    products,
    coupons
  };
};

export default connect(mapStateToProps)(_Products);
