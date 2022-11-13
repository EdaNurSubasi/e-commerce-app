import React, {createContext} from 'react'
import {useSelector} from 'react-redux'

import Security from '../utils/security'

const Context = createContext(null)
Context.displayName = 'SecurityContext'

const Provider = ({children}) => {
	const session = useSelector(state => state.user.session)
	const cart = useSelector(state => state.cart.store)

	if (session) {
		Security.session.save(session.data)
	} else {
		Security.session.clear()
	}

	if (cart) {
		Security.cart.save(cart.data)
	} else {
		Security.cart.clear()
	}

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export {Context, Provider}
