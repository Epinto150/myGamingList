import React, { useState } from "react"
import DeleteButton from "./DeleteGame"
import ButtonToCompleted from "./MoveToCompleted"

const GameTile = (props) => {
    const { game, games, currentUser, images, setGames} = props

    let deleteButton = ""
    if (game.id) {
        deleteButton = <DeleteButton key={game.id} setGames={setGames} gameId={game.id} game={game} games={games} />
    }

    let moveComplete = ""
    if (game.id) {
        moveComplete = <ButtonToCompleted key={game.id} setGames={setGames} gameId={game.id} game={game} games={games} />
    }

    let correctImage

    console.log(images)

    console.log(game.id)

    if (images) {

        images.map((image) => {
            if (game.title == image.title) {
                correctImage = image.image
            }
        })
    }



    return (
        <div>
            <img src={`${correctImage}`} alt="Cover not found"></img>
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
            {/* <div>
                {moveComplete}
            </div> */}

        </div>
    )
}

export default GameTile