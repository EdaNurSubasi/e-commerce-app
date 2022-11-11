import axios from 'axios'
import {GenericError} from '../../models'

//TODO: Development Mode Configurations
// Basic app configurations
const CONFIG = {
	host: process.env.REACT_APP_API_URL,
}

// Basic client configurations
const CLIENT = axios.create({
	baseURL: CONFIG.host,
})

export const REQUEST = 'Request'
export const METHOD = {
	post: 'post',
	get: 'get',
	patch: 'patch',
	delete: 'delete',
}

const headers_ = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': METHOD}

// TODO: Autorization Adding?
const request = (method, endpoint, data, headers) => {
	let ch = {}

	return CLIENT.request({
		method: method,
		url: `${CONFIG.host}${endpoint}`,
		withCredentials: false,
		responseType: 'json',
		data: data,
		headers: {
			...headers,
		},
		timeout: 30000,
	})
		.then(response => {
			const payload = response.data

			return {payload: payload, headers: response.headers}
		})
		.catch(error => {
			console.warn(`${method.toUpperCase()} request to ${endpoint} with data ${JSON.stringify(data)} failed with error ${error}`)

			return Promise.reject({
				error: GenericError.http(error),
			})
		})
}

export default store => next => async action => {
	const requestAction = action[REQUEST]
	if (typeof requestAction === 'undefined') {
		return next(action)
	}

	const {types} = requestAction

	let {endpoint} = requestAction
	let {method} = requestAction
	let {data} = requestAction
	let {headers} = requestAction

	console.log(`Requesting ${method} ${CONFIG.host}/${endpoint} with data ${JSON.stringify(data)}`)

	if (!METHOD.hasOwnProperty(method)) {
		throw new Error(`Method ${method} is not supported.`)
	}

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}

	// let authorization = undefined
	// if ( authorized ) {
	//     const u = Security.client.get()

	//     if ( u ) {
	//         authorization = u.token
	//     }

	//     if (!authorization) {
	//         throw new Error('Authorized flag specified but no authorization token found for request ' + endpoint)
	//     }
	// }

	const actionWith = data => {
		const fa = Object.assign({}, action, data)
		delete fa[REQUEST]
		return fa
	}

	const [successType, failureType] = types //Request Type, Success Type, Failure Type

	return request(method, endpoint, data, headers).then(
		response =>
			next(
				actionWith({
					type: successType.type,
					payload: response.payload,
					headers: response.headers,
				})
			),
		error =>
			next(
				actionWith({
					type: failureType.type,
					...error,
				})
			)
	)
}
