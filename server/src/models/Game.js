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
               userID: { type: "string" }
           }
       }
   }
}


module.exports = Game