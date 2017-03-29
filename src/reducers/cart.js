import {action_types} from '../actions/const';
const {ADD_TO_CART, REMOVE_FROM_CART} = action_types;

export function cart(state = {}, action){
	switch(action.type){
		case ADD_TO_CART:
			let pizza = {};

			let toppings = action.pizza.toppings;
			pizza[action.id] = {
				id: action.id,
				pizza: Object.assign({}, action.pizza)
			};

			//because deep copy isn't working, need to find a better solution
			let copyPizza = JSON.parse(JSON.stringify(pizza));	
			return Object.assign({}, state, copyPizza); 
			case REMOVE_FROM_CART:
			let new_cart = Object.assign({},state);
			delete new_cart[action.id];
			return new_cart;
		default:
			return state;
		}
	}

