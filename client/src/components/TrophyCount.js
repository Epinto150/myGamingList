import React from "react"

const TrophyCount = ({trophies}) => {
    let totalTrophyCount = 0
    console.log(trophies)
    for (let i = 0; i < trophies.length; i++) {
        totalTrophyCount = totalTrophyCount + trophies[i]
    }

    return (totalTrophyCount)
}

export default TrophyCount