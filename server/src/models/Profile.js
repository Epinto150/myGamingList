const Model = require("./Model.js")

class Profile extends Model {
    static get tableName() {
        return "profiles"
    }


    static get jsonSchema() {
        return {
            type: "object",
            required: ["username", "userID"],
            properties: {
                username: { type: "string" },
                userID: { type: "string" }
            }
        }
    }

}

module.exports = Profile