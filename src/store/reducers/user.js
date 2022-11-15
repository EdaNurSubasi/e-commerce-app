import {createReducer} from '@reduxjs/toolkit'
import {creators} from '../actions/user'
import Security from './../../utils/security'

export const user = createReducer(
	{
		session: {
			data: Security.session.get(),
			waiting: false,
			error: null,
		},
	},
	builder => {
		builder

			//Login
			.addCase(creators.login.begin, (state, action) => {
				state.session.waiting = true
			})
			.addCase(creators.login.success, (state, action) => {
				state.session = {
					data: action.payload,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.login.fail, (state, action) => {
				state.session = {
					data: null,
					waiting: false,
					error: action.error,
				}
			})

			//Logout
			.addCase(creators.logout, (state, action) => {
				state.session = {
					data: Security.session.clear(),
					waiting: false,
					error: null,
				}
			})
	}
)

export default user
