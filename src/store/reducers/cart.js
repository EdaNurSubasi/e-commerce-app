import {createReducer} from '@reduxjs/toolkit'
import {creators} from '../actions/cart'

export const cart = createReducer(
	{
		store: {
			data: {}, // {id: {quantity:product}
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
	}
)

export default cart
