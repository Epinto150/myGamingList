import React, {useState, useEffect} from "react"
import SteamProfile from "./SteamProfile"


const axios = require('axios')
const cheerio = require('cheerio')

const Steam = (props) => {

    const { currentUser, games, setGames, addGame} = props

    const [steamProfile, setSteamProfile] = useState('')
    const [steamGameData, setSteamGameData] = useState('')

    let steamID = ""

    console.log(steamGameData)

    console.log(props.currentUser)
    console.log(props.userPayload.steamID)

    if(props.userPayload) {
        if(props.userPayload.steamID) {
            
            steamID = props.userPayload.steamID 

        }
    }
    console.log(steamID)


    if (steamID) {
        const url = `http://api.scraperapi.com?api_key=9d10a96d51b67b0a5d6486c58373d91c&url=https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=38A6570C41BACF954320F6922DA97D9D&steamids=${steamID}`

        const gamesDataUrl = `http://api.scraperapi.com?api_key=9d10a96d51b67b0a5d6486c58373d91c&url=http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=38A6570C41BACF954320F6922DA97D9D&steamid=${steamID}`

        useEffect(() => {
            getSteamProfile()
            getSteamGamesData()

        }, [])

        const getSteamProfile = () => {

            axios(url).then(response => {
                console.log(response)
                
                console.log(response.data.response.players)
                
                console.log(response.data.response.players[0].personaname)

                const profile = response.data.response.players[0]

                console.log(profile)
                
                const fetchedSteamName = profile.personaname

                const fetchedavatar = profile.avatar

                const fetchedid = profile.steamid

                const fetchedProfile = {steamName: fetchedSteamName, avatar: fetchedavatar, steamid: fetchedid}

                setSteamProfile(fetchedProfile)

                console.log(fetchedProfile)
            })
            .catch(error => console.error(`Error: ${error}`));
        }

        const getSteamGamesData = () => {
            axios(gamesDataUrl).then(response => {
                console.log(response)
                const fetchedData = response.data.response.games
                console.log(fetchedData)
                let gameIDArray = []

                if (fetchedData) {
                    for(let i = 0; i < fetchedData.length; i++) {
                        gameIDArray.push(fetchedData[i].appid)
                    }

                }
                
                if (gameIDArray.length > 1) {
                    setSteamGameData([...gameIDArray])
                }
            }).catch(error => console.error(`Error: ${error}`))
        }


    }


    return(
        
            <SteamProfile currentUser={currentUser} steamProfile={steamProfile} steamGameData={steamGameData} steamID={steamID} games={games} setGames={setGames} addGame={addGame} />
       

    )



}

export default Steam