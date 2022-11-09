import {translate} from '../localization'

export const Codes = Object.freeze({
	network: {
		1000: 'unreachable',
	},
	api: {
		401: 'unauthorized',
		403: 'forbidden',
		404: 'not_found',
		408: 'timeout',
		409: 'conflict',
		400: 'validation',
		500: 'server_error',
		502: 'gateway',
	},
})

export const Domain = Object.freeze({
	api: 'api',
	app: 'app',
	network: 'network',
})

export class GenericError extends Error {
	constructor(code, message, domain = Domain.api, payload = null) {
		super(message)

		this.code = code
		this.domain = domain
		this.payload = payload

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, GenericError)
		}
	}

	static http = error => {
		return new GenericError(
			error.response.status,
			error.response.data?.key ?? Codes[Domain.api][error.response.status],
			Domain.api,
			error.response.data
		)
	}

	get translated() {
		return translate.string(`error.${this.domain}.${this.message}`)
	}
}
