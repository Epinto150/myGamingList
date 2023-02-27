import React, { useState } from "react"

const ButtonToInProgress = (props) => {
    const { gameId, game, games, setGames} = props

    const moveGame = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}/inprogress`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type":"application/json"
                }),
                body: JSON.stringify({
                    progress: "In Progress"
                })
            })
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            if (games) {

                const returnedGames = games.filter(game => game.id !== gameId) 
                const updatedGame = game
                updatedGame.progress = "In Progress"
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
            Set to In-Progress
        </button>
    )
}

export default ButtonToInProgress