import React, { useState } from "react"

const ButtonToNotStarted = (props) => {
    const { gameId, game, games, setGames} = props

    const moveGame = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}/notstarted`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type":"application/json"
                }),
                body: JSON.stringify({
                    progress: "Not Started"
                })
            })
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }

            console.log(games)
            if (games) {

                const returnedGames = games.filter(game => game.id !== gameId) 
                const updatedGame = game
                updatedGame.progress = "Not Started"
                setGames(
                    [...returnedGames, updatedGame]
                )
            }

        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    return (
        <button type="button" className="button edit-complete" onClick={moveGame}>
            Set to Not Started
        </button>
    )
}

export default ButtonToNotStarted