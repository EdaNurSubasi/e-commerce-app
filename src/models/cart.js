import {Entity, Model} from './base'

class CartProduct extends Model {
	constructor() {
		super()

		this.productId = 0
		this.quantity = 0
	}

	encode() {
		return {
			productId: this.productId,
			quantity: this.quantity,
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)

		this.productId = json.productId
		this.quantity = json.quantity
	}
}

export class Cart extends Entity {
	constructor() {
		super()

		this.userId = ''
		this.date = new Date()
		this.products = []
	}

	encode() {
		return {
			id: this.id,
			userId: this.userId,
			date: this.date,
			products: this.products,
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)

		this.userId = json.userId
		this.date = json.date
		this.products.push(json.products)
	}
}
