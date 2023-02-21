import React, { useState } from "react"

const GameTile = ({ game , image }) => {
    const { id, title, progress, system, description, userID} = game
    
    console.log(image)


    return (
        <div>
            <img src={`${image}`} alt="Cover not found"></img>
            <h4>{title}</h4>
            <p>{progress}</p>
            <p>{system}</p>
            <p>{description}</p>
        </div>
    )
}

export default GameTile