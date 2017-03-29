import fetch from 'graphql-fetch';
import { pizza_query, pizza_url, action_types} from './const';
const {ITEMS_IS_LOADING, ITEMS_HAS_ERRORED, ITEMS_FETCH_DATA_SUCCESS, ADD_TO_CART, REMOVE_FROM_CART} = action_types;
import uuid from 'uuid';
/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */

function itemsIsLoading(bool){
	return {
		type: ITEMS_IS_LOADING,
		isLoading: bool
	}
};

function itemsHasErrored(bool){
	return {
		type: ITEMS_HAS_ERRORED,
		hasErrored: bool
	}
};

function itemsFetchDataSuccess(items){
	return {
		type: ITEMS_FETCH_DATA_SUCCESS,
		items
	}
};

function getPizzaData(){
	return (dispatch) => {
		dispatch(itemsIsLoading(true));

		(fetch(pizza_url))(pizza_query, {}, {}).then(function (results) {
			dispatch(itemsIsLoading(false));
		  if (results.errors) {
		    return dispatch(itemsHasErrored(true));
		  }
		  return  dispatch(itemsFetchDataSuccess(results.data));
		})
	}
};

function addToCart(pizza){
	return {
		type: ADD_TO_CART,
		pizza,
		id:uuid()
	}
};

function removeFromCart(id){
	return {
		type: REMOVE_FROM_CART,
		id
	}	
};

const actions = {
	itemsIsLoading,
	itemsHasErrored,
	itemsFetchDataSuccess,
	getPizzaData,
	addToCart,
	removeFromCart
};

module.exports = actions;
