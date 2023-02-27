import React, { useState, useEffect } from "react"

const SteamProfile = (props) => {

    
    const { currentUser, steamProfile, steamID, steamGameData, addGame, games, setGames} = props

    
    const axios = require('axios')
    
    
    console.log(steamProfile)
    
    
    console.log(steamGameData)
    
    let displaySteamGames = ''
    
    let steamHomePage = ''
    
    if (steamGameData) {
        const [steamGames, setSteamGames] = useState('')
        console.log(steamGames)
        
        
        useEffect(() => {
            getSteamGame()
        }, [])
    const getSteamGame = () => {
        let gameUrl
            let steamAppId
            
            if (steamID && steamGameData) {
                for (let i = 0; i < steamGameData.length; i++) {
                    steamAppId = steamGameData[i]
                    console.log(steamAppId)
                    
                    gameUrl = `https://api.scraperapi.com?api_key=9d10a96d51b67b0a5d6486c58373d91c&url=https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${steamAppId}&key=38A6570C41BACF954320F6922DA97D9D&steamid=${steamID}`
                    
                    axios(gameUrl).then(response => {
                       
                        
                        const gameData = response.data.playerstats
                        
                        
                    const steamGameName = gameData.gameName
                    
                    console.log(steamGameName)
                    
                    const achievements = gameData.achievements

                    console.log(achievements)

                    let achievementCounter = 0

                    let trophyCounter = 0

                    if (achievements) {

                        for (let i = 0; i < achievements.length; i++) {
                            if (achievements[i].achieved == 1) {
                                achievementCounter++
                        }
                    }
                    
                    if (achievementCounter > (achievements.length/2)) {
                        trophyCounter++     
                        
                        if (achievementCounter == achievements.length) {
                            trophyCounter++
                        }
                    }
                }
                    
                    const addSteamGametoGames = async () => {

                        if (gameData) {
                            if (!games.some(e => e.title === gameData.gameName && e.userID === currentUser.id))
                            await addGame({ title: gameData.gameName, progress: "N/A", system: "Steam", description: "", userID: currentUser.id, trophies: trophyCounter})
                        }
                    }

                    addSteamGametoGames()
                        
                }).catch(error => console.error(`Error: ${error}`))
                
                
            }
            
        } 
    }

       
        }
        if (steamProfile) {
            return (
            <div>

            <div className="steamProfileTile" key={steamProfile.steamid}>
                <h4 align="center">Steam Profile:</h4>
                <h4 align="center" className="steamProfileName">{steamProfile.steamName}</h4>
                <img align="center" src={`${steamProfile.avatar}`} className="steamProfileAvatar"/>
                </div>
                </div>
        )
    } else {
        return (<h2>There is no Steam Profile yet</h2>)
    }

}

export default SteamProfile