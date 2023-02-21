import React, { useEffect, useState } from 
"react"
import NewGameForm from "./NewGameForm"
import GameTile from "./GameTile"
import getCurrentUser from "../services/getCurrentUser"




const axios = require('axios')
const cheerio = require('cheerio')
// const cors = require('cors')
// const corsOptions = {
//     origin:"http://localhost:3000",
//     credentials:true,
//     optionSuccessStatus:200
// }

// app.use(cors(corsOptions))

let url = ''

const GameList = (props) => {
    const currentUser = props.currentUser

    console.log(currentUser)

    const [user, setUser] = useState({ games: [] })
    const [games, setGames] = useState([])
    const [errors, setErrors] = useState({})

    const getGames = async () => {
        try {
            console.log("Hello")
            const response = await fetch("/api/v1/games/all")
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            console.log(response)
            const body = await response.json()
            setGames(body.games)
            console.log(body)
            
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    console.log(games)

    useEffect(() => {
        getGames()
    }, [])

    const addGame = async (formData) => {
        try {

            formData.userID = props.currentUser.id
            console.log(formData)
            const response = await fetch('/api/v1/games/new', {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ formData })
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                }
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                console.log(response)
                const { newGame } = await response.json()
                console.log(newGame)

                setGames([...games, newGame])
                setErrors({})
                return true
            }
        } catch (error) {
            console.error(`Fetch post error: ${error.name} (${error.message})`)
        }
    }
    
    console.log(props.currentUser)
    console.log(games)

//     const gameList = games.map((game) => {
        
//         let gameName = game.title

//         let imgUrl

//         console.log(gameName)

//         let gameName2 = gameName.replaceAll(' ', '%20')

//        console.log(gameName2)

//        url = `http://api.scraperapi.com?api_key=9f85b6d9712586e31ed9484e10cdb891&url=https://www.metacritic.com/search/game/${gameName2}/results`

//        const getImage = async () => {
//            const response = await axios(url)

           
//            const html = response.data
//            const $ = cheerio.load(html)
           
//            $('.first_result', html).each(function() {
//                var a = $(this)
               
//                imgUrl = a.find('img').attr('src');
               
//                console.log(a)
               
//                console.log(imgUrl)
//             })
            
//             console.log(url)
            
//             console.log(imgUrl)

//             return imgUrl
//         }

//         const getImgUrl = async () => {
//             const image = await getImage()
//         }


            
//             if (props.currentUser) 
//             {
                
//                 if (game.userID === props.currentUser.id) {
//                     return (
//                         <div className="callout secondary cell small-4 medium-4 large-4">
//                         <GameTile
//                         key={game.id}
//                         game={game}
//                         currentUser={props.currentUser}
//                         image={getImgUrl()}
//                         />
//                     </div>
        
//         )
//     }
// }
// })

// let gameList =[] 

// let gameName
// let gameName2
// let imgUrl
// let serializedGame

// for (let i = 0; i < games.length; i++ ) { 

            
            
            
    
//     const getImage = async () => {
        
//         gameName = games[i].title
        
        
//         console.log(gameName)
        
//         gameName2 = gameName.replaceAll(' ', '%20')
        
//         console.log(gameName2)
        
//         url = `http://api.scraperapi.com?api_key=9f85b6d9712586e31ed9484e10cdb891&url=https://www.metacritic.com/search/game/${gameName2}/results`

//         serializedGame = games[i] 

//         serializedGame.image = await new Promise (async (image) => {

            
//             const response = await axios(url)
            
            
//             const html = response.data
//             const $ = cheerio.load(html)
            
//             $('.first_result', html).each(function() {
//                 var a = $(this)
                
//                 imgUrl = a.find('img').attr('src');
                
//                 console.log(a)
                
//                 console.log(imgUrl)
//             })
            
//             console.log(url)
            
//             console.log(imgUrl)
            
//         }).then(function(){
//             return imgUrl
//         })
//         }
        
//         console.log(imgUrl)

//         const image = getImage()
//         console.log(image)
    
//     if (props.currentUser) 
//     {
//             if (games[i].userID === props.currentUser.id && games[i].image) {

            
//         games[i].image = image

//         gameList.push(games[i])
    
//         console.log(gameList)
//         }
// }
// }

// console.log(gameList)

let gameName = ''
let gameName2 = ''
let url = ''
let currentGame
let imgUrl = ''

const getUrl = gameName => 
new Promise(resolve => setTimeout(() => resolve(gameName), 2000))

const listGames = async () => {
    for(let i = 0; i < games.length; i++) {

        gameName = await getUrl(games[i].title)
        .then(() => {
            console.log(gameName)
            
            if (gameName)
            gameName2 = gameName.replaceAll(' ', '%20')
            console.log(gameName2)

            url = `http://api.scraperapi.com?api_key=9f85b6d9712586e31ed9484e10cdb891&url=https://www.metacritic.com/search/game/${gameName2}/results`
        }    
        )
        
                
                
                

        axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('.first_result', html).each(function() {
            var a = $(this)
                                
            imgUrl = a.find('img').attr('src');

            console.log(imgUrl)
        })
        
    }).then(() => {

        console.log(games[i])
        console.log(games[i].userID)
        console.log(currentUser.id)
        console.log(imgUrl)
        
        if (props.currentUser) {
        if (games[i].userID === currentUser.id) {
        
        return (
                                    <div className="callout secondary cell small-4 medium-4 large-4">
                                    <GameTile
                                    key={games[i].id}
                                    game={games[i]}
                                    currentUser={props.currentUser}
                                    image={imgUrl}
                                    />
                                </div>
        )
    }
}
    })
}
}

let gameTiles = listGames()

console.log(gameTiles)



    return (
        <div>

            
            <div className="grid-containter">
                <div className="grid-x grid-margin-x">
                        {/* {gameTiles} */}
                </div>
            </div>

            <h4>Add a new game to your list!</h4>
            <NewGameForm
            addGame={addGame}
            errors={errors} 
            currentUser={props.currentUser} />

        </div>
    )
}

export default GameList