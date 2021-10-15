/*
 * @Author: hft
 * @Date: 2021-10-15 10:01:30
 * @LastEditors: hft
 * @LastEditTime: 2021-10-15 15:30:04
 * @Description: file content
 */
import React from "react";
export const Card = ({ song }: any) => {
    return (
        <div className="card">
            <img
                src={song.albumArt}
                alt=""
            />
            <div className="content">
                <h2>{song.name}</h2>
                <span>BY: {song.artist}</span>
            </div>
        </div>
    )

}
export default Card