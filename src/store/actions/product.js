import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'
import {createAction} from '@reduxjs/toolkit'

export const creators = {
	products: createRequestActionCreators('products'),
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
	products: () => dispatch => {
		dispatch(creators.products.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.products.success(), creators.products.fail()],
				endpoint: `products`,
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
