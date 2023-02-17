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

export default gameRouter