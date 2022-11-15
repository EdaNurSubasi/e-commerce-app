import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'
import {createAction} from '@reduxjs/toolkit'

export const creators = {
	login: createRequestActionCreators('auth/login', token => {
		return {
			payload: token,
		}
	}),
	logout: createAction('logout'),
}

export const actions = {
	login: user => dispatch => {
		dispatch(creators.login.begin())

		dispatch({
			[REQUEST]: {
				types: [creators.login.success(), creators.login.fail()],
				endpoint: `auth/login`,
				method: METHOD.post,
				data: user,
				authorized: false,
			},
		})
	},
	logout: () => dispatch => {
		dispatch(creators.logout())
	},
}
