import React, { useEffect, useState, useRef } from 
"react"
import NewGameForm from "./NewGameForm"
import GameTile from "./GameTile"
import getCurrentUser from "../services/getCurrentUser"
import SteamForm from "./SteamForm"
import TrophyCount from "./TrophyCount"
import Trophy from "./Trophy"
import moveComplete from "./MoveComplete"




const axios = require('axios')
const cheerio = require('cheerio')

let url = ''

const GameList = (props) => {
    const currentUser = props.currentUser
    const games = props.games
    const setGames = props.setGames
    const addGame = props.addGame
    const [errors, setErrors] = useState ({})
    const [trophyCount, setTrophyCount] = useState ([0])
    const [images, setImages] = useState([])
    
    let gameId
    let trophies = 0

    const moveComplete = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}/complete`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type":"application/json"
                }),
                body: JSON.stringify({
                    progress: "Complete"
                })
            })
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
    
            console.log(games)
            if (games) {
    
                const returnedGames = games.filter(game => game.id !== gameId) 

                let game

                for (let i = 0; i < games.length; i++) {
                    if (games[i].id == gameId) {
                        game = games[i]
                    }
                } 

                const updatedGame = game
                updatedGame.progress = "Complete"
                setGames(
                    [...returnedGames, updatedGame]
                )
            }
    
        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const moveInProgress = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}/inprogress`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type":"application/json"
                }),
                body: JSON.stringify({
                    progress: "In Progress"
                })
            })
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
    
            console.log(games)
            if (games) {
    
                const returnedGames = games.filter(game => game.id !== gameId) 

                let game

                for (let i = 0; i < games.length; i++) {
                    if (games[i].id == gameId) {
                        game = games[i]
                    }
                } 

                const updatedGame = game
                updatedGame.progress = "In Progress"
                setGames(
                    [...returnedGames, updatedGame]
                )
            }
    
        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    
    const moveNotStarted = async () => {
        try {
            const response = await fetch(`/api/v1/games/${gameId}/notstarted`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type":"application/json"
                }),
                body: JSON.stringify({
                    progress: "Not Started"
                })
            })
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
    
            console.log(games)
            if (games) {
    
                const returnedGames = games.filter(game => game.id !== gameId) 

                let game

                for (let i = 0; i < games.length; i++) {
                    if (games[i].id == gameId) {
                        game = games[i]
                    }
                } 

                const updatedGame = game
                updatedGame.progress = "Not Started"
                setGames(
                    [...returnedGames, updatedGame]
                )
            }
    
        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(dragItem.current)
    }

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(dragOverItem.current)
    }

    const drop = (e) => {
        gameId = dragItem.current

        for (let i = 0; i < games.length; i++) {
            if (games[i].id == dragOverItem.current) {
                if (games[i].progress == "Complete") {
                    moveComplete()
                }
                else if (games[i].progress == "In Progress") {
                    moveInProgress()
                }
                else if (games[i].progress == "Not Started") {
                    moveNotStarted()
                }
            }

        }



        console.log(games)
    }
    
    if (games) {
        
        useEffect(() => {
            getImages(),
            getTrophyCount()
        }, [props.games]);
        
        const getTrophyCount = () => {

            setTrophyCount([0])
            
            for (let i = 0; i < games.length; i++) {
                if(games[i].trophies == '0') {
                    games[i].trophies = 0
                    
                    setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])
                }
                else if (games[i].trophies == '1') {
                    games[i].trophies = 1
                    
                    setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])                
                }
                else if (games[i].trophies == '2') {
                    games[i].trophies = 2
                    
                    setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])
                }
                else {
                    setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])
                }
                console.log(trophyCount) 
                
            }
        }

        const getImages = async () => {
            try {
                
                for (let i = 0; i < games.length; i++)
                {

                if (!images.some(e => e.title === games[i].title)) {
                
                let gameName = games[i].title
                
                let imgUrl
                
                
                let gameName2 
                
                if(gameName) {
                    gameName2 = gameName.replaceAll(' ', '%20')
                    
                }
                
                
                url = `http://api.scraperapi.com?api_key=e0ff4be3d31f20b37e5589c3f01f1418&url=http://www.metacritic.com/search/game/${gameName2}/results`
                
                axios(url).then(response => {
                    
                    const html = response.data
                    const $ = cheerio.load(html)
                    
                    $('.first_result', html).each(function() {
                        var a = $(this)
                        
                        imgUrl = a.find('img').attr('src');
                        
                    })
                    

                        setImages(images => [...images, {title: games[i].title, image: imgUrl}])
                        
                    })
                    
                }
            }
            
        } catch(error) {
            console.error(`Error in useEffect! ${error.message}`)
        }
    }
    
    
    if (trophyCount === [0]) {
        for (let i = 0; i < games.length; i++) {
            if(games[i].trophies == '0') {
                games[i].trophies = 0
                
                setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])
            }
            else if (games[i].trophies == '1') {
                games[i].trophies = 1
                
                setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])                
            }
            else if (games[i].trophies == '2') {
                games[i].trophies = 2
                
                setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])
            }
            else {
                setTrophyCount(trophyCount => [...trophyCount, games[i].trophies])
            }
            console.log(trophyCount) 
            
            showTrophyCount = <></>
        }
    }
    
    
}
    const completeGames = games.map((game) => {
        if (props.currentUser) 
        {
            
            if (game.userID === props.currentUser.id) {
                if(game.progress == "Complete") {

                return (
                    <div className="callout secondary cell small-12 medium-12 large-12 gameTile" key={game.id} onDragStart={(e) => dragStart(e, game.id)} onDragEnter={(e) => dragEnter(e, game.id)} onDragEnd={drop} draggable>
                    <GameTile
                    key={game.id}
                    setGames={setGames}
                    games={games}
                    game={game}
                    currentUser={props.currentUser}
                    images={images}
                    TrophyCount={TrophyCount}
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
                <div className="callout secondary cell small-12 medium-12 large-12 gameTile" key={game.id} onDragStart={(e) => dragStart(e, game.id)} onDragEnter={(e) => dragEnter(e, game.id)} onDragEnd={drop} draggable>
                <GameTile
                key={game.id}
                setGames={setGames}
                game={game}
                games={games}
                currentUser={props.currentUser}
                images={images}
                TrophyCount={TrophyCount}
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
                    <div className="callout secondary cell small-12 medium-12 large-12 gameTile" key={game.id} onDragStart={(e) => dragStart(e, game.id)} onDragEnter={(e) => dragEnter(e, game.id)} onDragEnd={drop} draggable>
                <GameTile
                key={game.id}
                setGames={setGames}
                game={game}
                games={games}
                currentUser={props.currentUser}
                images={images}
                TrophyCount={TrophyCount}
                />
            </div>

)

}
}
}
})

const steamGames = games.map((game) => {
    if (props.currentUser) 
    {
        
        if (game.userID === props.currentUser.id) {
            if(game.system == 'Steam') {
            return (
                <div className="callout secondary cell small-12 medium-12 large-12 gameTile" key={game.id} onDragStart={(e) => dragStart(e, game.id)} onDragEnter={(e) => dragEnter(e, game.id)} onDragEnd={drop}  draggable>
                <GameTile
                key={game.id}
                setGames={setGames}
                game={game}
                games={games}
                currentUser={props.currentUser}
                images={images}
                TrophyCount={TrophyCount}
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
let steamGamesLength = 0
let username = ''

    if (currentUser) {
        username = currentUser.username
    }

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

if (currentUser) {

    for (let i = 0; i < games.length; i++) {
        if (games[i].userID === props.currentUser.id) {
            if (games[i].system == "Steam") {
                steamGamesLength++
        }
    }
}
} 

let steamForm = <SteamForm currentUser={props.currentUser} errors={errors} games={games} setGames={setGames} addGame={addGame}/>

let showTrophyCount

    if (trophyCount.every(item => item === 0)) {
        showTrophyCount = ((completeGamesLength * 2) + (inProgressGamesLength))
    }
    else {

        showTrophyCount = <TrophyCount trophies={trophyCount} />
    }


    return (
        <div>

            <h3 align="center" className="greeting">Hi {username}, here is your gaming list!</h3>

            <h4 align="center"> You have {showTrophyCount} trophies! <Trophy trophies={1} /> {showTrophyCount} </h4>
            

            <div className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout game-list cell small-4 medium-4 large-4">


            
            <div className="grid-container border">
                        
                        <h4 className="gameTile-Header">Completed Games</h4>

                        <h6 className="numberOfGames">-You have {completeGamesLength} completed games-</h6>
                       
                        <div className="grid-x grid-margin-x scroll">
                        {completeGames}

                </div>
            </div>
                       
                    </div>

                    <div className="callout game-list cell small-4 medium-4 large-4">


            <div className="grid-container  border">
                        
                        <h4 className="gameTile-Header">In-Progress Games</h4>

                        <h6 className="numberOfGames">-You have {inProgressGamesLength} in-progress games-</h6>
                       
                        <div className="grid-x grid-margin-x scroll">
                        {inProgressGames}

                </div>
            </div>
                    </div>
                    <div className="callout game-list cell small-4 medium-4 large-4">


            <div className="grid-container border">
                        
                        <h4 className="gameTile-Header">Not Started</h4>

                        <h6 className="numberOfGames">-You have {notStartedGamesLength} not started games-</h6>
                       
                        <div className="grid-x grid-margin-x scroll">
                        {notStartedGames}

                </div>
            </div>
                    </div>
            </div>

            </div>
            <div  className="grid-container border">
                
                <div className="grid-x grid-margin-x">
                    <div className="callout game-list steam-game-tile">
            
                    <h4 className="gameTile-Header" align="center">Steam Games</h4>

                    <h6 className="numberOfGames" align="center">-You have {steamGamesLength} Steam games-</h6>
                    <div className="grid-x grid-margin-x scroll">
                {steamGames}
                </div>
                </div>
            </div>
            </div>

            <div align="center" className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout  game-form">


            <h4>Add a new game to your list!</h4>
            <NewGameForm
            addGame={addGame}
            errors={errors} 
            currentUser={props.currentUser} />

                    </div>
                </div>
            </div>

            <div>
                {steamForm}
            </div>
          
        </div>
    )


}
export default GameList