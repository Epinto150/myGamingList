import React from "react"

const SteamProfile = (props) => {

    const { steamProfile } = props

    console.log(steamProfile)

    if (steamProfile) {
        return (
            <div className="steamProfileTile" key={steamProfile.steamid}>
                <h4>Steam Profile:</h4>
                <h4 className="steamProfileName">{steamProfile.steamName}</h4>
                <img src={`${steamProfile.avatar}`} className="steamProfileAvatar"/>
                
            </div>
        )
    } else {
        return (<h2>There is no Steam Profile yet</h2>)
    }

}

export default SteamProfile