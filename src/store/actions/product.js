import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'
import {createAction} from '@reduxjs/toolkit'

export const creators = {
	products: createRequestActionCreators('products'),
	product: createRequestActionCreators('products/:id'),
	categories: createRequestActionCreators('products/categories'),
	category: createRequestActionCreators('products/category/:category'),
	login: createRequestActionCreators('user/login', user => {
		return {
			payload: user,
		}
	}),
	logout: createAction(`user/logout`),
	clear: {
		error: createAction(`user/error/clear`),
		data: {
			registered: createAction(`user/data/registered/clear`),
		},
	},
	register: createRequestActionCreators('user/register', form => {
		return {
			payload: form,
		}
	}),
}

export const actions = {
	products:
		(limit = 10, sort = 'asc', category = null) =>
		dispatch => {
			dispatch(creators.products.begin())

			dispatch({
				[REQUEST]: {
					types: [creators.products.success(), creators.products.fail()],
					endpoint: category ? `products/category/${category}?sort=${sort}&limit=${limit}` : `products?sort=${sort}&limit=${limit}`,
					method: METHOD.get,
					authorized: false,
				},
			})
		},
	product: id => dispatch => {
		dispatch(creators.product.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.product.success(), creators.product.fail()],
				endpoint: `products/${id}`,
				method: METHOD.get,
				authorized: false,
			},
		})
	},
	categories: () => dispatch => {
		dispatch(creators.categories.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.categories.success(), creators.categories.fail()],
				endpoint: `products/categories`,
				method: METHOD.get,
				authorized: false,
			},
		})
	},
	login: user => dispatch => {
		dispatch(creators.login.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.login.success(), creators.login.fail()],
				endpoint: `user/authenticated`,
				method: METHOD.post,
				data: user,
				authorized: false,
			},
		})
	},
}
