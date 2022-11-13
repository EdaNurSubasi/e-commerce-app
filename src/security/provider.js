import React, {createContext} from 'react'
import {useSelector} from 'react-redux'

import Security from '../utils/security'

const Context = createContext(null)
Context.displayName = 'SecurityContext'

const Provider = ({children}) => {
	const session = useSelector(state => state.user.session)

	if (session) {
		Security.session.save(session)
	} else {
		Security.session.clear()
	}

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export {Context, Provider}
