import {configureStore} from '@reduxjs/toolkit'
import reducer from './reducer'
import request from './middlewares/request'
import error from './middlewares/error'

// Global variable and data storing. Like database. Stores app state.
export const store = configureStore({
    reducer: reducer,
    middleware: getMiddleware => getMiddleware().concat([request, error]),
})

export default store
