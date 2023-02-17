class GameSerializer {
    static async getSummary(game) {
        const allowedAttributes = ['id', 'title', 'progress', 'system', 'description', 'userID']

        let serializedGame = {}

        for (const attribute of allowedAttributes) {
            serializedGame[attribute] = game[attribute]
        }

        return serializedGame
    }

    static async getSummaries(games) {
        return await Promise.all(games.map(game => GameSerializer.getSummary(game)))
    }

  
}

export default GameSerializer