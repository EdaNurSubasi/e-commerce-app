export class Model {
    encode() {
        return Object.keys(this).reduce( (a, k) => {
            if (this[k] instanceof Model) {
                a[k] = this[k].encode()
            } else {
                a[k] = this[k]
            }

            return a
        }, {})
    }

    decode(json) {
    }

    validate() {
        return true
    }
}

export class Entity extends Model{
    constructor(id = null) {
        super()
        this.id = id
    }

    decode(json) {
        super.decode(json)
        this.id = json.id
    }

    validate() {
        return !!this.id
    }
}