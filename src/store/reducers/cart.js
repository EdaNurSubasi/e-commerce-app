import {createReducer} from '@reduxjs/toolkit'
import {Cart, Product} from '../../models'

import {creators} from '../actions/cart'

export const cart = createReducer(
	{
		store: {
			data: {}, // {id: quantity}
			waiting: false,
			error: null,
		},
	},
	builder => {
		builder

			//Store Card
			.addCase(creators.store, (state, action) => {
				if (state.store.data != null && state.store.data[action.payload]) {
					state.store.data[action.payload] = state.store.data[action.payload] += 1
				} else {
					state.store.data[`${action.payload}`] = 1
				}
			})
	}
)

export default cart
