import React, { useState } from "react"

const GameTile = (props) => {
    const { game, currentUser, images} = props
    
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
            <p>{game.progress}</p>
            <p>{game.system}</p>
            <p>{game.description}</p>
        </div>
    )
}

export default GameTile