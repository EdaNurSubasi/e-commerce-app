import {combineReducers} from '@reduxjs/toolkit'

import * as reducers from './reducers'

export default combineReducers({
	...reducers,
})
