import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPizzaData, addToCart} from '../actions';

class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
			pizzas:[]
		};
		this.handleSubmit.bind(this);
		this.handleToppingChange.bind(this);
		this.handlePizzaChange.bind(this);
	}

	componentWillMount(){
		//get pizzas and prices
		this.props.fetchPizzaData();
	}

	componentWillReceiveProps(props){
		//update the state in response to prop changes: https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops
		this.setState({pizzas: props.pizzas});
	}

	handlePizzaChange(event, pizza_index){
		this.setState({selected_pizza : pizza_index});
	}

	handleToppingChange(event, topping_index, pizza_index){
		let pizzas = this.state.pizzas;
		let topping_default_selected = pizzas[pizza_index].toppings[topping_index].defaultSelected;
		let count_selected = 0;	

		//count up number of toppings
		pizzas[pizza_index].toppings.map((topping) => {
			if(topping.defaultSelected == true){
				count_selected += 1;	
			}
		});

		//based on last change, add or remove to count,
		if (topping_default_selected){
			count_selected -= 1;
		}else{
			count_selected += 1;
		}

		//allow adding if maxToppings is null or checked count not over max toppings
		if (pizzas[pizza_index].maxToppings === null || count_selected <= pizzas[pizza_index].maxToppings){
			pizzas[pizza_index].toppings[topping_index].defaultSelected = !pizzas[pizza_index].toppings[topping_index].defaultSelected;

			//disable if we reach the limit
			if (count_selected == pizzas[pizza_index].maxToppings){
				pizzas[pizza_index].disabled = true;
			}else{
				pizzas[pizza_index].disabled = false;
			}

			this.setState({pizzas});
		}
		event.preventDefault;
	}

	handleSubmit(event){
		const {selected_pizza, pizzas} = this.state;
		if (selected_pizza === undefined){
			alert('select a pizza first');
		}else{
			let pizza = pizzas[selected_pizza];
			//calculate the price of the added pizza later since it might have an edit cart
			this.props.addToCart(pizza);
		}
		event.preventDefault();
	}

	render() {
		const {itemsHasErrored, itemsIsLoading, pizzas} = this.props;
		return (
			<div>
			{itemsHasErrored ? 'errored' : ''}
			{itemsIsLoading ? 'loading' : ''}

			<form onSubmit={(e) => (this.handleSubmit(e))}>
			<div style={{overflow:'hidden'}}>

			{this.state.pizzas.map((pizza, pizza_index) => (
				<div key={pizza_index} style={{float: 'left', width: '200px'}}>
				<input checked={this.state.selected_pizza == pizza_index} type='radio' onChange={(e) => (this.handlePizzaChange(e, pizza_index))} name='pizza' value={pizza.name} />{pizza.name} - ${pizza.basePrice} <br /> 
				<h4>Toppings - maxToppings {pizza.maxToppings ? pizza.maxToppings : 'as much as you want'}</h4>

				{pizza.toppings.map((topping_object, topping_index) => (
					<div key={topping_index}>
					<input disabled={pizza.disabled && !topping_object.defaultSelected} onChange={(e) => (this.handleToppingChange(e, topping_index, pizza_index))} type='checkbox' checked={topping_object.defaultSelected}  /> 
					{topping_object.topping.name} - ${topping_object.topping.price}
					</div>
					))}
				</div>
				))}
			</div>
			<input type='submit' value='add' />
			</form>

			</div>
		)
	}	
}

const mapStateToProps = (state) => {
	return {
		itemsHasErrored : state.itemsHasErrored,
		itemsIsLoading : state.itemsIsLoading,
		pizzas : state.items
	}	
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPizzaData : () => {
			dispatch(getPizzaData());
		},
		addToCart : (pizza) => {
			dispatch(addToCart(pizza));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
