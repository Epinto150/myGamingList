import React, { useState, useEffect } from "react"

import GameList from "./GameList"
import SteamForm from "./SteamForm"
import NewGameForm from "./NewGameForm"

const HomePage = (props) => {

    const [games, setGames] = useState([])
    const [errors, setErrors] = useState([])

    let formVisibility = "invisible"

    let defaultVisibility = "visible"


    if (props.currentUser) {
        formVisibility = "visible"
        defaultVisibility = "invisible"
    }

    

    const getGames = async () => {
        try {
            const response = await fetch("/api/v1/games/all")
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            const body = await response.json()
            setGames(body.games)
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
            const { newGame } = await response.json()

            setGames([...games, newGame])
            setErrors({})
            return true
        }
    } catch (error) {
        console.error(`Fetch post error: ${error.name} (${error.message})`)
    }
}

    if (games) {

        return (
            <div>
            <div className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout welcome cell">
                        <h2>Welcome to myGamingList!</h2>
                    </div>
                </div>
            </div>

            <div className={`${defaultVisibility}`}>
                <h4>Please Sign in or register to make full use of your gaming list!</h4>
            </div>

            <div className={`${formVisibility} gameList`}>
                <h3 className="gameList-Header"></h3>
                <GameList setGames={setGames} games={games} currentUser={props.currentUser} errors={errors} addGame={addGame}/>

                <div align="center" className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout  game-form">


            {/* <h4>Add a new game to your list!</h4>
            <NewGameForm
            addGame={addGame}
            errors={errors} 
            currentUser={props.currentUser} /> */}

                    </div>
                </div>
            </div>


            </div>
            
        </div>
    )
}
}

export default HomePage