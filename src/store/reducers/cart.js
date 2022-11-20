import {createReducer} from '@reduxjs/toolkit'

import Security from '../../utils/security'
import {creators} from '../actions/cart'

export const cart = createReducer(
	{
		store: {
			data: Security.cart.get() ? Security.cart.get() : {}, // {id: {quantity,product}
			waiting: false,
			error: null,
		},
	},
	builder => {
		builder

			//Store Card
			.addCase(creators.store, (state, action) => {
				if (state.store.data != null && state.store.data[action.payload.pr.id]) {
					state.store.data[action.payload.pr.id].quantity = state.store.data[action.payload.pr.id].quantity += action.payload.c
					if (state.store.data[action.payload.pr.id].quantity < 1) {
						delete state.store.data[action.payload.pr.id]
					}
				} else {
					state.store.data[action.payload.pr.id] = {quantity: action.payload.c, product: action.payload.pr}
				}
			})

			.addCase(creators.clear, (state, action) => {
				state.store.data = {}
			})
	}
)

export default cart
