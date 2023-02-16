const Model = require("./Model.js")


class Game extends Model {
   static get tableName() {
       return "games"
   }


   static get jsonSchema() {
       return {
           type: "object",
           required: ["title", "progress", "system"],
           properties: {
               title: { type: "string" },
               progress: { type: "string" },
               system: { type: "string" },
               description: { type: "string" }
           }
       }
   }
}


module.exports = Game