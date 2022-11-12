import {createRequestActionCreators} from './utils'

import {REQUEST, METHOD} from '../middlewares/request'
import {createAction} from '@reduxjs/toolkit'

export const creators = {
	store: createAction('cart/store/product', id => {
		return {
			payload: id,
		}
	}),
}

export const actions = {
	store: id => dispatch => {
		dispatch(creators.store(id))
	},
}
