import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'

export const creators = {
	products: createRequestActionCreators('products'),
	product: createRequestActionCreators('products/:id'),
	categories: createRequestActionCreators('products/categories'),
	category: createRequestActionCreators('products/category/:category'),
	delete: createRequestActionCreators('products/delete/:id'),
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
	delete: id => dispatch => {
		dispatch(creators.delete.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.delete.success(), creators.delete.fail()],
				endpoint: `products/${id}`,
				method: METHOD.delete,
				authorized: false,
			},
		})
	},
}
