import React, { useState, useEffect } from "react"
import usersRouter from "../../../server/src/routes/api/v1/usersRouter"


import NewGameForm from "./NewGameForm"




const HomePage = (props) => {


   const [games, setGames] = useState([])
   const [errors, setErrors] = useState({})


   let formVisibility = "invisible"


   if (props.currentUser) {
       formVisibility = "visible"
   }


   // const getGames = async () => {
   //     try {
   //       const response = await fetch("/api/v1/games/all")
   //       if (!response.ok) {
   //         throw new Error(`${response.status} (${response.statusText})`)
   //       }
   //       const body = await response.json()
   //       setGames(body.games)
   //     } catch (error) {
   //       console.error(`Error in fetch: ${error.message}`)
   //     }
   //   }


   //   useEffect(() => {
   //     getGames()
   //   }, [])


   //   const addGame = async (formData) => {
   //     try {
   //       const response = await fetch('/api/v1/game/new', {
   //         method: "POST",
   //         headers: new Headers({
   //           "Content-Type": "application/json"
   //         }),
   //         body: JSON.stringify({ formData })
   //       })
   //       if (!response.ok) {
   //         if (response.status === 422) {
   //           const errorBody = await response.json()
   //           const newErrors = translateServerErrors(errorBody.errors)
   //           return setErrors(newErrors)
   //         }
   //         throw new Error(`${response.status} ${response.statusText}`)
   //       } else {
   //         const { newGame } = await response.json();
   //         setGames([...games, newGame])
   //         setErrors({})
   //         return true;
   //       }
   //     } catch (error) {
   //       console.error(`Fetch post error: ${error.name} ${error.message}`)
   //     }
   //   }




   return (
       <div>


           <div className="grid-container">
               <div className="grix-x grid-margin-x">
                   <div className="callout secondary cell">
                   <h2>Welcome to My Gaming List!</h2>
                   </div>
               </div>
           </div>
          
           <div className="grid-container">
               <div className="grix-x grid-margin-x">
                   <div className="callout secondary cell">
                       <p>Your very own videogame tracker! Much wow, Very woosh!</p>


                       <p>Please sign in to fully utilize the site's features!</p>
                   </div>
               </div>
           </div>


           <div className={`${formVisibility}`}>


               <div className="grid-container">
                   <div className="grix-x grid-margin-x">
                       <div className="callout secondary cell">
                           <h3>Add games to your list!</h3>


                           <NewGameForm
                           errors={errors} />
                       </div>
                   </div>
               </div>
           </div>
       </div>
      
   )
}


export default HomePage
