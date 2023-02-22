import React, {useState, useEffect} from "react"
import SteamProfile from "./SteamProfile"


const axios = require('axios')
const cheerio = require('cheerio')

const Steam = (props) => {

    const [steamProfile, setSteamProfile] = useState('')

    let steamID = ""

    

    console.log(props.currentUser)
    console.log(props.userPayload.steamID)

    if(props.userPayload) {
        if(props.userPayload.steamID) {
            
            steamID = props.userPayload.steamID 

        }
    }
    console.log(steamID)


    if (steamID) {
        const url = `http://api.scraperapi.com?api_key=9f85b6d9712586e31ed9484e10cdb891&url=https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=38A6570C41BACF954320F6922DA97D9D&steamids=${steamID}`


        useEffect(() => {
            getSteamProfile()
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


    }


    return(
        
            <SteamProfile steamProfile={steamProfile} />
       

    )



}

export default Steam