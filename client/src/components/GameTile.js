import React, { useState } from "react"

const GameTile = ({ game }) => {
    const { id, title, progress, system, description, userID } = game
    
    return (
        <div>
            <h4>{title}</h4>
            <p>{progress}</p>
            <p>{system}</p>
            <p>{description}</p>
        </div>
    )
}

export default GameTile