import React, { useEffect, useState } from 
"react"
import NewGameForm from "./NewGameForm"
import GameTile from "./GameTile"
import getCurrentUser from "../services/getCurrentUser"




const axios = require('axios')
const cheerio = require('cheerio')

let url = ''

const GameList = (props) => {
    const currentUser = props.currentUser
    const games = props.games
    const setGames = props.setGames
    console.log(currentUser)
    console.log(props.games)
    
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState ({})
    const [gamesArray, setGamesArray] = useState([])
    
    

    console.log(games)

    
    useEffect(() => {
        getImages()        
    }, [props.games])

    
    const getImages = async () => {
        try {

            for (let i = 0; i < games.length; i++)
            {

            console.log(games[i])
                
            let gameName = games[i].title
            
            let imgUrl

            let imgArray = []
            
            console.log(gameName)
            
            let gameName2 
            
            if(gameName) {
                gameName2 = gameName.replaceAll(' ', '%20')

            }
            
            console.log(gameName2)
            
            url = `http://api.scraperapi.com?api_key=9f85b6d9712586e31ed9484e10cdb891&url=https://www.metacritic.com/search/game/${gameName2}/results`
            
                axios(url).then(response => {

                    
                    
                    const html = response.data
                    const $ = cheerio.load(html)
                    
                    $('.first_result', html).each(function() {
                        var a = $(this)
                        
                        imgUrl = a.find('img').attr('src');
                        
                        console.log(a)
                        
                        console.log(imgUrl)
                        
                        console.log(images)
                        
                    })
                    
                    
                    
                    console.log(imgArray)
                    console.log(url)
                    
                    console.log(imgUrl)

                    let image = { title: games[i].title, image: imgUrl }
                    
                    setImages(images => [...images, image])
                })
            }
            
        } catch(error) {
            console.error(`Error in useEffect! ${error.message}`)
        }
    }
    
        


    
    console.log(props.currentUser)
    console.log(games)

    console.log(images)


    const completeGames = games.map((game) => {
        if (props.currentUser) 
        {
          
            if (game.userID === props.currentUser.id) {
                if(game.progress == "Complete") {
                    let image = images[game.id - 1]

                return (
                    <div className="callout secondary cell small-12 medium-12 large-12 gameTile">
                    <GameTile
                    key={game.id}
                    setGames={setGames}
                    games={games}
                    game={game}
                    currentUser={props.currentUser}
                    images={images}
                    />
                </div>
    
                    )
    
                }
            }
            
        }
})

const inProgressGames = games.map((game) => {

    

    if (props.currentUser) 
    {
        
        if (game.userID === props.currentUser.id) {
            if(game.progress == "In Progress") {
            return (
                <div className="callout secondary cell small-12 medium-12 large-12 gameTile">
                <GameTile
                key={game.id}
                setGames={setGames}
                game={game}
                games={games}
                currentUser={props.currentUser}
                images={images}
                />
            </div>

                )

            }
        }
    }
})

const notStartedGames = games.map((game) => {
    if (props.currentUser) 
    {
        
        if (game.userID === props.currentUser.id) {
            if(game.progress == "Not Started") {
            return (
                <div className="callout secondary cell small-12 medium-12 large-12 gameTile">
                <GameTile
                key={game.id}
                setGames={setGames}
                game={game}
                games={games}
                currentUser={props.currentUser}
                images={images}
                />
            </div>

                )

            }
        }
    }
})

    let completeGamesLength = 0
    let inProgressGamesLength = 0
    let notStartedGamesLength = 0

    if (currentUser) {

        for (let i = 0; i < games.length; i++) {
            if (games[i].userID === props.currentUser.id) {
                if (games[i].progress == "Complete") {
                    completeGamesLength++
            }
        }
    }
}
    
if (currentUser) {

    for (let i = 0; i < games.length; i++) {
        if (games[i].userID === props.currentUser.id) {
            if (games[i].progress == "In Progress") {
                inProgressGamesLength++
        }
    }
}
}

if (currentUser) {

    for (let i = 0; i < games.length; i++) {
        if (games[i].userID === props.currentUser.id) {
            if (games[i].progress == "Not Started") {
                notStartedGamesLength++
        }
    }
}
}


    return (
        <div>

            <div className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout game-list cell small-4 medium-4 large-4">


            
            <div className="grid-containter border">
                        
                        <h4 className="gameTile-Header">Completed Games</h4>

                        <h6 className="numberOfGames">-You have {completeGamesLength} completed games-</h6>
                       
                        <div className="grid-x grid-margin-x">
                        {completeGames}

                </div>
            </div>
                       
                    </div>

                    <div className="callout game-list cell small-4 medium-4 large-4">


            <div className="grid-containter  border">
                        
                        <h4 className="gameTile-Header">In-Progress Games</h4>

                        <h6 className="numberOfGames">-You have {inProgressGamesLength} in-progress games-</h6>
                       
                        <div className="grid-x grid-margin-x">
                        {inProgressGames}

                </div>
            </div>
                    </div>
                    <div className="callout game-list cell small-4 medium-4 large-4">


            <div className="grid-containter border">
                        
                        <h4 className="gameTile-Header">Not Started</h4>

                        <h6 className="numberOfGames">-You have {notStartedGamesLength} not started games-</h6>
                       
                        <div className="grid-x grid-margin-x">
                        {notStartedGames}

                </div>
            </div>
                    </div>
            </div>
            </div>

          
        </div>
    )
}

export default GameList