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
			.addCase(creators.login.begin, (state, action) => {
				state.session.waiting = true
			})
			.addCase(creators.login.success, (state, action) => {
				console.log(action.payload)
				state.session = {
					data: action.payload,
					waiting: false,
					error: null,
				}
			})
			.addCase(creators.login.fail, (state, action) => {
				console.log(action.payload)
				state.session = {
					data: null,
					waiting: false,
					error: action.error,
				}
			})
	}
)

export default user
