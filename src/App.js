import React, { Component} from 'react';
import { connect } from 'react-redux';
import { setProducts, setCoupons } from './store';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Products from './Products';
import Product from './Product';

class _App extends Component{
  componentDidMount(){
    this.props.loadData();
  }
  render(){
    const { products, coupons } = this.props;
    return (
      <Router>
        <div>
          <h1><Link to='/products'>Products { products.length }</Link></h1>
          <h1><Link to='/coupons'>Coupons { coupons.length }</Link></h1>
        </div>
        <Route path='/products' exact component={ Products } />
        <Route path='/products/:id' component={ Product } />
      </Router>
    ); 
  };
}

const mapStateToProps = ({ products, coupons})=> {
  return {
    products,
    coupons
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    loadData: ()=> {
      dispatch(setProducts());
      dispatch(setCoupons());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(_App);
