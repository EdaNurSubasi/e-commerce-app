import Storage from './storage'

const Security = {
	session: {
		save: session => {
			Storage.save('session', session)
		},
		get: () => {
			return Storage.load('session')
		},
		clear: () => {
			Storage.clear('session')
		},
	},
	cart: {
		save: cart => {
			Storage.save('cart', cart)
		},
		get: () => {
			return Storage.load('cart')
		},
		clear: () => {
			Storage.clear('cart')
		},
	},
}

export default Security
