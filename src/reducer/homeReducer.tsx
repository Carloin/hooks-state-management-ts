/*
 * @Author: hft
 * @Date: 2021-10-15 10:41:18
 * @LastEditors: hft
 * @LastEditTime: 2021-10-15 15:27:00
 * @Description: file content
 */


import { HomeState } from "../components/Home";
import { AppAction } from "./appReducer"
// interface Obj {
//     HomeStateObj: HomeState
// }
export const homeReducer = (state: HomeState, action: AppAction) => {
    switch (action.type) {
        case "FETCH_SONGS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case "FETCH_SONGS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                //  action.payload songs的数组
                songs: action.payload
            };
        case "FETCH_SONGS_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        case "ADD_SONG_REQUEST":
            return {
                ...state,
                isSongSubmitting: true,
                songHasError: false,
            }
        case "ADD_SONG_SUCCESS":
            return {
                ...state,
                isSongSubmitting: false,
                songs: [...state.songs, action.payload]
            }
        case "ADD_SONG_FAILURE":
            return {
                ...state,
                isSongSubmitting: false,
                songHasError: true,
            }
        default:
            return state;
    }
}
