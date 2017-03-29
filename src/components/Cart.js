import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pizza from './Pizza';
import Decimal from 'decimal.js-light';

class Cart extends Component {

	getCartTotal(){
		const {cart} = this.props;

		let totalPrice = new Decimal(0);

		Object.keys(cart).map((index) => {
			let pizza = cart[index].pizza;
			let pizzaPrice = new Decimal(pizza.basePrice);
			totalPrice = totalPrice.plus(pizzaPrice);
			pizza.toppings.map((topping_object) =>{
				if (topping_object.defaultSelected){
					let topping_price = new Decimal(topping_object.topping.price);
					totalPrice = totalPrice.plus(topping_price);
				}
			});
		});

		return totalPrice.toString();
	}

	render() {
		const {cart} = this.props;
		return (
			<div>
				<h4>Cart</h4>
				<div style={{overflow:'hidden'}}>
				{
					Object.keys(cart).map((index) => (
						<Pizza key={index} pizza={cart[index]}></Pizza>
					))
				}
				</div>
				<h4>Total - {this.getCartTotal()}</h4>

			</div>
			);
	}
}

const mapStateToProps = (state) => {
	return {
		cart : state.cart
	}	
};


export default connect(mapStateToProps)(Cart);
