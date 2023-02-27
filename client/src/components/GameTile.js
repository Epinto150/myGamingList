import React, { useEffect, useState } from "react"
import DeleteButton from "./DeleteGame"
import ButtonToCompleted from "./MoveToCompleted"
import ButtonToInProgress from "./MoveToInProgress"
import ButtonToNotStarted from "./MoveToNotStarted"
import Trophies from "./Trophy"
import TrophyCount from "./TrophyCount"

const GameTile = (props) => {
    const { game, games, currentUser, setGames, images, TrophyCount} = props

    

    let deleteButton = ""
    if (game.id) {
        deleteButton = <DeleteButton key={game.id} setGames={setGames} gameId={game.id} game={game} games={games} TrophyCount={TrophyCount} />
    }

    let moveComplete = ""
    if (game.id && game.progress !== "Complete") {
        moveComplete = <ButtonToCompleted key={game.id} setGames={setGames} gameId={game.id} game={game} games={games} TrophyCount={TrophyCount}/>
    }

    let moveInProgress = ""
    if (game.id && game.progress !== "In Progress") {
        moveInProgress = <ButtonToInProgress key={game.id} setGames={setGames} gameId={game.id} game={game} games={games} TrophyCount={TrophyCount} />
    }

    let moveNotStarted = ""
    if (game.id && game.progress !== "Not Started") {
        moveNotStarted = <ButtonToNotStarted key={game.id} setGames={setGames} gameId={game.id} game={game} games={games} TrophyCount={TrophyCount} />
    }

    let correctImage

    for (let i = 0; i < images.length; i++) {
        if (game.title === images[i].title) {
            correctImage = images[i].image
            break;
        }
    }
        
    if (game.progress == "Complete") {
        game.trophies = 2
    }

    if (game.progress == "In Progress") {
        game.trophies = 1
    }

    if (game.progress == "Not Started") {
        game.trophies = 0
    }



    if (game.description == "") {

        return (
            <div>
                <div>

                    <Trophies trophies={game.trophies} />
                </div>
            <img className="game-cover" src={`${correctImage}`} alt="Cover not found"></img>
            <h4>{game.title}</h4>
            <div className="tileText">Progress</div>
            <p>{game.progress}</p>
            <div className="tileText">System</div>
            <p>{game.system}</p>

            <p>{game.trophies}</p>

            <div>
                {deleteButton}
            </div>
            <div>
                {moveComplete}
            </div>

            <div>
                {moveInProgress}
            </div>
            
            <div>
                {moveNotStarted}
            </div>

        </div>
    )
}
else if (game.description) {

    return (
        <div>
        <Trophies trophies={game.trophies} />
        <img className="game-cover" src={`${correctImage}`} alt="Cover not found"></img>
        <h4>{game.title}</h4>
        <div className="tileText">Progress</div>
        <p>{game.progress}</p>
        <div className="tileText">System</div>
        <p>{game.system}</p>
        <div className="tileText">Description</div>
        <p>{game.description}</p>

        <div>
            {deleteButton}
        </div>
        <div>
            {moveComplete}
        </div>

        <div>
            {moveInProgress}
        </div>
        
        <div>
            {moveNotStarted}
        </div>

    </div>
)
}
}

export default GameTile