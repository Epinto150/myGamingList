import express from "express"
import Objection from "objection"
const { ValidationError } = Objection;

import cleanUserInput from "../../../services/cleanUserInput.js"

import { Game } from "../../../models/index.js"
import GameSerializer from "../../../serializers/GameSerializer.js";


const gameRouter = new express.Router()








gameRouter.get("/all", async (req, res) => {
    try {
        const games = await Game.query()
        const serializedGames = await GameSerializer.getSummaries(games)


        // scrape the metacritic pages for those images and also add those to the response
            // try {
    
            //     for (let i = 0; i < serializedGames.length; i++)
            //     {
    
            //     console.log(serializedGames[i])
                    
            //     let gameName = serializedGames[i].title
                
            //     let imgUrl
                    
            //     console.log(gameName)
                
            //     let gameName2 = gameName.replaceAll(' ', '%20')
                
            //     console.log(gameName2)
                
            //     url = `http://api.scraperapi.com?api_key=9f85b6d9712586e31ed9484e10cdb891&url=https://www.metacritic.com/search/game/${gameName2}/results`
                
            //         axios(url).then(response => {
            
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
    
            //             let image = { title: serializedGames[i].title, image: imgUrl }
                        
            //             setImages(images => [...images, image])
            //         })
            //     }
                
            // } catch(error) {
            //     console.error(`Error in useEffect! ${error.message}`)
            // }
        


        return res.status(200).json({
            games: serializedGames
        })
    } catch (error) {
        return res.status(500).json({
            errors: error
        })
    }
})

gameRouter.post("/new", async (req, res) => {
    const { formData } = req.body;
    const cleanedFormData = cleanUserInput(formData)

    try {
        const newGame = await Game.query().insertAndFetch(cleanedFormData)
        return res.status(201).json({ newGame })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }

})

gameRouter.delete("/:id", async (req,res) => {
    const { id } = req.params

    console.log(id)
    try {

        await Game.query().findById(req.params.id).delete()
        return res.status(204).json({ message: "game has been deleted!" })
    } catch (err) {
        return res.status(500).json({errors: err})
    }
})

gameRouter.patch("/:id", async (req,res) => {
    const { id } = req.params

    
    try {
        const game = await Game.query().findById(req.params.id)
        game.progress = "Complete"

        console.log(game)

        const returnedGames = await Game.query().findById(req.params.id).delete()
        const updatedGames = await Game.query().insertAndFetch(game)
        console.log(updatedGames)
        
        
            
        return res.status(201).json({ updatedGames })
    } catch (err) {
        return res.status(500).json({errors: err})
    }
})

export default gameRouter