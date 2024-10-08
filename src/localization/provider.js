import I18n from 'i18n-js'
import 'moment/locale/tr'

import {useContext, createContext} from 'react'

import en from './translations/en'
import tr from './translations/tr'
import {ConfigContext} from '../config'

I18n.fallbacks = true
I18n.translations = {
	en,
	tr,
}

const Context = createContext(null)
Context.displayName = 'LocalizationContext'

const Provider = ({children}) => {
	const {language} = useContext(ConfigContext)

	I18n.locale = language

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export {Context, Provider}
