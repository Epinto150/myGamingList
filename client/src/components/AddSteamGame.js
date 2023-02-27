import React, { useState } from "react"

const AddSteamGame = (props) => {

    const {steamGames, addSteamGame, steamGameDatabase} = props


    if (steamGames && steamGameDatabase) {

        for (let i = 0; i < steamGames.length; i++) {
            if (steamGameDatabase) {
                addSteamGame(steamGames[i])
            }
        }
    } else {
        return (<h2>There is not steamGameDataBase yet</h2>)
    }

   return (<h2>There is no steamGameDatabase yet</h2>)
}

export default AddSteamGame