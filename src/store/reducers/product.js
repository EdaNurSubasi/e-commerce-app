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
		product: {
			data: null,
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

			//Product
			.addCase(creators.product.begin, (state, action) => {
				state.product.waiting = true
			})
			.addCase(creators.product.success, (state, action) => {
				const p = new Product()
				p.decode(action.payload)
				state.product = {
					data: p,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.product.fail, (state, action) => {
				state.product = {
					data: state.product.data,
					waiting: false,
					error: action.error,
				}
			})
	}
)

export default product
