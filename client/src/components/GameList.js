import React, { useEffect, useState } from 
"react"
import NewGameForm from "./NewGameForm"
import GameTile from "./GameTile"
import getCurrentUser from "../services/getCurrentUser"

const GameList = (props) => {
    const [games, setGames] = useState([])
    const [errors, setErrors] = useState({})

    const getGames = async () => {
        try {
            console.log("Hello")
            const response = await fetch("/api/v1/games/all")
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            console.log(response)
            const body = await response.json()
            setGames(body.games)
            console.log(body)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getGames()
    }, [])

    const addGame = async (formData) => {
        try {

            formData.userID = props.currentUser.id
            console.log(formData)
            const response = await fetch('/api/v1/games/new', {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ formData })
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                }
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                console.log(response)
                const { newGame } = await response.json()
                console.log(newGame)
                

                setGames([...games, newGame])
                setErrors({})
                return true
            }
        } catch (error) {
            console.error(`Fetch post error: ${error.name} (${error.message})`)
        }
    }
    
    console.log(props.currentUser)

    const gameList = games.map((game) => {
        if (props.currentUser) 
        {

            if (game.userID === props.currentUser.id) {
                return (
                    <div className="callout secondary cell small-4 medium-4 large-4">
                        <GameTile
                        key={game.id}
                        game={game}
                        currentUser={props.currentUser}
                        />
                    </div>
        
                )
            }
        }
    })

    return (
        <div>
            <div className="grid-containter">
                <div className="grid-x grid-margin-x">
                        {gameList}
                </div>
            </div>
            <NewGameForm
            addGame={addGame}
            errors={errors} 
            currentUser={props.currentUser} />

        </div>
    )
}

export default GameList