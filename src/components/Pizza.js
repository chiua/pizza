import React, {Component} from 'react';
import Decimal from 'decimal.js-light';
import {connect} from 'react-redux';
import {removeFromCart} from '../actions';

class Pizza extends Component {
	constructor(props){
		super(props);
		this.getPizzaPrice.bind(this);
	}
	
	handleRemove(e){
		const {pizza, remove_pizza} = this.props;
		remove_pizza(pizza.id);
	}

	getPizzaPrice(){
		const {pizza : pizza_object} = this.props;
		const {pizza} = pizza_object;
		let price = new Decimal(pizza.basePrice);
		let toppings = pizza.toppings;
		for (let i = 0; i < toppings.length; i++){
			if (toppings[i].defaultSelected){
				let topping_price = new Decimal(toppings[i].topping.price);
				price = price.plus(topping_price);
			}
		}
		return price;
	}

	render() {
		const {pizza : pizza_object, remove_pizza} = this.props;
		const {pizza, id} = pizza_object;

		return (
			<div style={{float: 'left', width: '200px', height: '200px', margin: '10px'}}>
			<div>{pizza.name} {pizza.basePrice}</div>
			{pizza.toppings.map((topping_object, topping_index) => (
				<div key={topping_index}>
				{topping_object.defaultSelected &&
					<div>
					{topping_object.topping.name} -
					{topping_object.topping.price}
					</div>
				}	
				</div>
				))}
			<div>Price - {this.getPizzaPrice().toString()}</div>
			<button onClick={this.handleRemove.bind(this)}>Delete</button>
			</div>
			);
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		remove_pizza: (id) => {
			dispatch(removeFromCart(id))
		}	
	}
}


export default connect(null, mapDispatchToProps)(Pizza);
