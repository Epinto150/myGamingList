import React, { useState } from "react"

const DeleteButton = (props) => {
    const { gameId, game, games, setGames } = props

    const deleteGame = async () => {
        console.log(games)
        console.log(game)
        try {
            const response = await fetch(`/api/v1/games/${gameId}`, {
                method: "delete",
                headers: new Headers({
                    "Content-Type":"application/json"
                })
            })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw (error)
            }

            console.log(games)
            if (games) {

                const returnedGames = games.filter(game => game.id !== gameId) 
                console.log(returnedGames)
                setGames(
                    [...returnedGames]
                )
            }

        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    return (
        <button type="button" className="button delete-game" onClick={deleteGame}>
            Delete Game
        </button>
    )


}

export default DeleteButton