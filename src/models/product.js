import {Entity, Model} from './base'

class Rating extends Model {
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
