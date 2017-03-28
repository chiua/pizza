import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPizzaData} from '../actions';
import {Map} from 'immutable';

class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {};
		this.handleSubmit.bind(this);
		this.handleChange.bind(this);
	}

	componentDidMount(){
		this.props.fetchPizzaData();
	}

	handleChange(event, topping_index, pizza_index){
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

	handleSubmit(event, b){
		event.preventDefault();
	}

	render() {
		const {itemsHasErrored, itemsIsLoading, pizzas} = this.props;
		this.state.pizzas = pizzas;

		return (
			<div>
				{itemsHasErrored ? 'errored' : ''}
				{itemsIsLoading ? 'loading' : ''}

					<div style={{overflow:'hidden'}}>

						{this.state.pizzas.map((pizza, pizza_index) => (
							<div key={pizza_index} style={{float: 'left', width: '200px'}}>
								<input type='radio' onChange={(e) => (this.handleChange(e,'hi'))} name='pizza' value={pizza.name} />{pizza.name} - ${pizza.basePrice} <br /> 
								<form onSubmit={(e) => (this.handleSubmit(e))}>
									<h4>Toppings - maxToppings {pizza.maxToppings ? pizza.maxToppings : 'as much as you want'}</h4>


									{pizza.toppings.map((topping_object, topping_index) => (
										<div key={topping_index}>
											<input disabled={pizza.disabled && !topping_object.defaultSelected} onChange={(e) => (this.handleChange(e, topping_index, pizza_index))} type='checkbox' checked={topping_object.defaultSelected}  /> 
											{topping_object.topping.name} - ${topping_object.topping.price}
										</div>
									))}
								</form>


							</div>
						))}

					</div>
					<input type='submit' value='add' />

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
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPizzaData : () => {
			dispatch(getPizzaData())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
