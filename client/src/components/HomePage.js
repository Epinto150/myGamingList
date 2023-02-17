import React, { useState, useEffect } from "react"

import NewGameForm from "./NewGameForm"
import GameList from "./GameList"

const HomePage = (props) => {

    const [games, setGames] = useState([])
    const [errors, setErrors] = useState([])

    let formVisibility = "invisible"

    let defaultVisibility = "visible"

    if (props.currentUser) {
        formVisibility = "visible"
        defaultVisibility = "invisible"
    }



    console.log(props.currentUser)

    return (
        <div>
            <div className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout secondary cell">
                        <h2>Welcome to My Gaming List!</h2>
                    </div>
                </div>
            </div>

            <div className={`${defaultVisibility}`}>
                <h4>Please Sign in or register to make full use of your gaming list!</h4>
            </div>

            <div className={`${formVisibility} gameList`}>
                <h3>Here is your current Gaming List:</h3>
                <GameList currentUser={props.currentUser} errors={errors}/>
            </div>
            
        </div>
    )
}

export default HomePage