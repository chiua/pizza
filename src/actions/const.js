/* eslint-disable import/prefer-default-export */
/* Populated by react-webpack-redux:action */
const action_constants  = {
	pizza_query : `
	{pizzaSizes {
		name
		maxToppings
		basePrice
		toppings {
			topping {
				name
				price
			}
			defaultSelected
		}
	}}`,
	pizza_url : 'https://core-graphql.dev.waldo.photos/pizza',
	action_types : {
		ITEMS_IS_LOADING : 'ITEMS_IS_LOADING',
		ITEMS_HAS_ERRORED : 'ITEMS_HAS_ERRORED',
		ITEMS_FETCH_DATA_SUCCESS : 'ITEMS_FETCH_DATA_SUCCESS',
		ADD_TO_CART : 'ADD_TO_CART',
		REMOVE_FROM_CART : 'REMOVE_FROM_CART'

	}
};

module.exports = action_constants;
