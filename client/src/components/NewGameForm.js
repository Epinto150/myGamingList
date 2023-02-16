import React, { useState, useEffect } from "react"


import ErrorList from "./layout/ErrorList"


import progress from "./constants/progress"
import system from "./constants/system"


const NewGameForm = ({ addGame, errors }) => {
   const emptyNewGame = {
       title: '',
       progress: '',
       system: '',
       description: ''
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
          
           <label htmlFor="title">
               Title: <input type="text" onChange={handleInputChange} value={newGame.title} />
           </label>


           <label htmlFor="progress">
               Progress: <select name="progress" onChange={handleInputChange} value={newGame.progress}>
                   {progressOptions}
               </select>
           </label>


           <label htmlFor="system">
               System: <select name="system" onChange={handleInputChange} value={newGame.progress}>
                   {progressOptions}
               </select>
           </label>


           <label htmlFor="description">
               Description: <input type="text"
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
