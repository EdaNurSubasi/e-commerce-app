import {createReducer} from '@reduxjs/toolkit'
import {Product} from '../../models'

import {creators} from '../actions/product'

export const product = createReducer(
	{
		products: {
			data: [],
			waiting: false,
			error: null,
		},
	},
	builder => {
		builder

			//Products
			.addCase(creators.products.begin, (state, action) => {
				state.products.waiting = true
			})
			.addCase(creators.products.success, (state, action) => {
				let ps = action.payload.map(element => {
					const p = new Product()
					p.decode(element)
					return p
				})
				state.products = {
					data: ps,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.products.fail, (state, action) => {
				state.products = {
					data: state.products.data,
					waiting: false,
					error: action.error,
				}
			})

			.addDefaultCase((state, action) => {
				console.log('Default case', action.type)
			})
	}
)

export default product
