import {Entity} from './base'

/**
 * {
		id: 1,
		title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: 109.95,
		description:
			'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
		category: "men's clothing",
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		rating: {
			rate: 3.9,
			count: 120,
		},
	}
*/
class Rating extends Entity {
	constructor() {
		super()

		this.rate = 0.0
		this.count = 0
	}

	encode() {
		return {
			rate: this.rate,
			count: this.count,
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)

		this.rate = json.rate
		this.count = json.count
	}
}

export class Product extends Entity {
	constructor() {
		super()

		this.title = ''
		this.price = 0.0
		this.description = ''
		this.category = ''
		this.image = ''
		this.rating = new Rating()
	}

	encode() {
		return {
			id: this.id,
			title: this.title,
			price: this.price,
			description: this.description,
			category: this.category,
			image: this.image,
			rating: this.rating?.encode(),
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)

		this.title = json.title
		this.price = json.price
		this.description = json.description
		this.category = json.category
		this.image = json.image
		this.rating = new Rating()

		this.rating.decode(json.rating)
	}
}
