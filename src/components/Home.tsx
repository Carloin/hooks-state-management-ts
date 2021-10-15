/*
 * @Author: hft
 * @Date: 2021-10-15 09:58:05
 * @LastEditors: hft
 * @LastEditTime: 2021-10-15 16:28:31
 * @Description: file content
 */
import React from "react"
import { AuthContext } from "../App"
import { homeReducer } from "../reducer/homeReducer";
import Card from "./Card";
import AddSong from "./AddSong";

export interface HomeState {
    songs: any,
    isFetching: boolean,
    hasError: boolean,
    isSongSubmitting: boolean,
    songHasError: boolean

}

export const initalState: HomeState = {
    songs: [],
    isFetching: false,
    hasError: false,
    isSongSubmitting: false,
    songHasError: false,

}
//因为这里没有约束类型，会根据initalState，认为是HomeState，所以state会报错：不能将类型“{ state: any; dispatch: any; }”分配给类型“HomeState”。
export const SongContext = React.createContext<any>(initalState);
const Home = () => {
    // 与 SongContext无关系
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch]: any = React.useReducer<any>(homeReducer, initalState);
    const [isAddSongModalVisible, setAddSongModalVisibility] = React.useState(false);
    const toggleAddSong = () => {
        console.log("1");

        setAddSongModalVisibility(!isAddSongModalVisible);
        console.log("2");

    }
    React.useEffect(() => {
        dispatch({
            type: "FETCH_SONGS_REQUEST"
        });
        fetch("https://hookedbe.herokuapp.com/api/songs", {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then(resJson => {
                console.log("resJson", resJson);
                dispatch({
                    type: "FETCH_SONGS_SUCCESS",
                    // payload返回的结果
                    // resJson (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                    payload: resJson
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: "FETCH_SONGS_FAILURE"
                });
            });
    }, [authState.token]);
    return (
        <React.Fragment>
            <SongContext.Provider value={{
                // 为什么state会报错呢
                state,
                dispatch
            }}>
                <button className="toggle-button" onClick={toggleAddSong}>ADD SONG</button>
                <AddSong onClose={toggleAddSong} show={isAddSongModalVisible} />
            </SongContext.Provider>
            <div className="home">
                {state.isFetching ? (
                    <span className="loader">LOADING...</span>
                ) : state.hasError ? (
                    <span className="error">AN ERROR HAS OCCURED</span>
                ) : (
                    <>
                        {state.songs.length > 0 &&
                            state.songs.map((song: any) => (
                                <Card key={song.id.toString()} song={song} />
                            ))}
                    </>
                )}
            </div>
        </React.Fragment>
    );
}
export default Home