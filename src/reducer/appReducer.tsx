import { stringify } from "querystring";
import { IState } from "../App";

/*
 * @Author: hft
 * @Date: 2021-10-13 17:20:30
 * @LastEditors: hft
 * @LastEditTime: 2021-10-15 15:08:52
 * @Description: file content
 */
export interface payload {
    user: string
    token: string
}
export interface AppAction {
    type: string
    payload: payload

}
export interface returnValue {
    payload: payload
    IAction: AppAction
}
export interface ICache {
    setMyItem(key: string, value: string | any): void;
    getMyItem(key: string): any;


}

export const appReducer = (state: IState, action: AppAction) => {
    switch (action.type) {
        case "LOGIN":
            setMyItem("user", action.payload.user)
            setMyItem("token", action.payload.token)
            // localStorage.setItem("token", JSON.stringify(action.payload.token))
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case "LOGOUT":
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        default:
            return state
    }
}
const setMyItem = (key: string, value: string | any) => {
    localStorage.setItem(key, JSON.stringify(value))
}