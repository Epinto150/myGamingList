import React, { useState, useEffect } from "react"


import ErrorList from "./layout/ErrorList"


import progress from "./constants/progress"
import system from "./constants/system"


const NewGameForm = ({ addGame, errors }) => {
   const emptyNewGame = {
       title: '',
       progress: '',
       system: '',
       description: '',
       trophies: 0
   }



   const [newGame, setNewGame] = useState(emptyNewGame)


   const handleInputChange = (event) => {
       setNewGame({
           ...newGame,
           [event.currentTarget.name]: event.currentTarget.value
       })
   }


   const handleSubmit = async (event) => {
       event.preventDefault()
       if (await addGame(newGame)) {
           clearForm()
       }
   }


   const clearForm = () => {
       setNewGame(emptyNewGame)
   }


   const progressOptions = progress.map(progress => {
       return (
           <option key={progress} value={progress}>{progress}</option>
       )
   })


   const systemOptions = system.map(system => {
       return (
           <option key={system} value={system}>{system}</option>
       )
   })


   return (
       <form onSubmit={handleSubmit}>
           <ErrorList errors={errors} />
          
           <label htmlFor="title" className="form-text">
               Title: <input type="text" name="title" onChange={handleInputChange} value={newGame.title} />
           </label>


           <label  className="form-text" htmlFor="progress">
               Progress: <select name="progress" onChange={handleInputChange} value={newGame.progress}>
                   {progressOptions}
               </select>
           </label>


           <label htmlFor="system" className="form-text">
               System: <select name="system" onChange={handleInputChange} value={newGame.system}>
                   {systemOptions}
               </select>
           </label>


           <label htmlFor="description" className="form-text">
               Description (optional): <input type="text"
               name="description"
               onChange={handleInputChange}
               value={newGame.description} />
           </label>


           <input type="submit"
           className="button" />


       </form>
   )
}


export default NewGameForm
