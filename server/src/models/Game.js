const Model = require("./Model.js")


class Game extends Model {
   static get tableName() {
       return "games"
   }


    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "progress", "system", "userID"],
            properties: {
                title: { type: "string" },
                progress: { type: "string" },
                system: { type: "string" },
                description: { type: "string" },
                userID: { type: "string" },
                image: { type: "string" },
                trophies: { type: "integer" }
            }
        }
    }

    static get relationMappings() {
        const { User } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "games.userID",
                    to: "users.id"
                }
            }
        }
    }
    
}


module.exports = Game