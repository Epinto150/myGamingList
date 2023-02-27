class GameSerializer {
    static async getSummary(game) {
        const allowedAttributes = ['id', 'title', 'progress', 'system', 'description', 'userID', 'image', 'trophies']

        let serializedGame = {}

        for (const attribute of allowedAttributes) {
            serializedGame[attribute] = game[attribute]
        }

        return serializedGame
    }

    static async getSummaries(games) {
        return await Promise.all(games.map(game => GameSerializer.getSummary(game)))
    }

    static async editGameComplete(game) {
        let serializedGame = game
        serializedGame.progress = "Complete"

        return serializedGame
    }

    static async editGameInProgress(game) {
        let serializedGame = game
        serializedGame.progress = "Complete"

        return serializedGame
    }

    static async editGameNotStarted(game) {
        let serializedGame = game
        serializedGame.progress = "Complete"

        return serializedGame
    }


  
}

export default GameSerializer