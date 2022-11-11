import I18n from 'i18n-js'

import {Provider as LocalizationProvider, Context as LocalizationContext} from './provider'

const translate = {
	string: (key, fallback = null, params = null) => {
		return I18n.t(key, {defaultValue: fallback, ...params})
	},
}

export {LocalizationProvider, LocalizationContext, translate}
