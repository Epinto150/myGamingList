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

gameRouter.patch("/:id/complete", async (req,res) => {
    const { id } = req.params

    try {

        const game = await Game.query().findById(id)
        game.progress = "Complete"
        console.log(game)

        const updatedGames = await Game.query().findById(id).delete()

        const newGamesList = await Game.query().insertAndFetch(game)   
            
        return res.status(201).json({ newGamesList })
    } catch (err) {
        console.log(err)
        return res.status(500).json({errors: err})
    }
})

gameRouter.patch("/:id/inprogress", async (req,res) => {
    const { id } = req.params

    try {

        const game = await Game.query().findById(id)
        game.progress = "In Progress"
        console.log(game)

        const updatedGames = await Game.query().findById(id).delete()

        const newGamesList = await Game.query().insertAndFetch(game)   
            
        return res.status(201).json({ newGamesList })
    } catch (err) {
        console.log(err)
        return res.status(500).json({errors: err})
    }
})

gameRouter.patch("/:id/notstarted", async (req,res) => {
    const { id } = req.params

    try {

        const game = await Game.query().findById(id)
        game.progress = "Not Started"
        console.log(game)

        const updatedGames = await Game.query().findById(id).delete()

        const newGamesList = await Game.query().insertAndFetch(game)   
            
        return res.status(201).json({ newGamesList })
    } catch (err) {
        console.log(err)
        return res.status(500).json({errors: err})
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


export default gameRouter