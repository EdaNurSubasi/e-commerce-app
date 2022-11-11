import {createAction} from "@reduxjs/toolkit"

export const createRequestActionCreators = (type, prepare = null) => {
    return ({
        begin: createAction(`${type}/begin`, prepare),
        success: createAction(`${type}/success`),
        fail: createAction(`${type}/fail`)
    })
}