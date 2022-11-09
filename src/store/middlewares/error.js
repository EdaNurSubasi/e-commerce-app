import {UserActions, GenericActions} from '../actions'

export const extract = {
    error: data => {
        return data ? (data.response ? (data.response.data ? data.response.data : data) : data) : null
    },
}

export default store => next => action => {
    if (action.error) {
        let error = extract.error(action.error)

        switch (error.code) {
            case 502:
                error.key = 'api.error.gateway'
                break
            default:
                error.key = 'api.error.unknown'
                break
        }
    }

    return next(action)
}
