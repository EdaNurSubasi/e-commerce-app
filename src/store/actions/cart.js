import {createAction} from '@reduxjs/toolkit'

export const creators = {
	store: createAction('cart/store/product', (product, count) => {
		return {
			payload: {pr: product, c: count},
		}
	}),
	clear: createAction('cart/clear'),
}

export const actions = {
	store: (product, count) => dispatch => {
		dispatch(creators.store(product, count))
	},
	clear: () => dispatch => {
		dispatch(creators.clear())
	},
}
