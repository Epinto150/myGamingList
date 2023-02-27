import React, { useState } from "react"
import FormError from "./layout/FormError"
import Steam from "./Steam"

const SteamForm = (props) => {
    const [userPayload, setUserPayload] = useState({ steamID: "" })
    const [errors, setErrors] = useState({})
    const [steamProfileArray, setSteamProfileArray] = useState([])
    const [formVisibility, setFormVisibility] = useState("visible")
    const [defaultVisibility, setDefaultVisibility] = useState("invisible")
    const [users, setUsers] = useState({})

    const { games, setGames, images, addGame} = props

    const onSubmit = async (event) => {
        event.preventDefault()
        
        setFormVisibility("invisible")
        setDefaultVisibility("visible")
        setSteamProfileArray([...steamProfileArray, userPayload])
       
    }
    const steamProfile = steamProfileArray.map((payload) => {
        
            return (
            <div>
                <Steam currentUser={props.currentUser}
                userPayload={payload} errors={errors} games={games} setGames={setGames} addGame={addGame}/>
            </div>
            )
        
    })

    const onInputChange = (event) => {
        setUserPayload({ ...userPayload, [event.currentTarget.name]: event.currentTarget.value, 
        });
    };

    return (
        <div>

        <div className={`grid-container ${formVisibility}`} onSubmit={onSubmit}>
            <h3 className="syncSteam">Sync your Steam games to your list!</h3>
            <form>
                <div>
                    <label>
                        SteamID
                        <input type="text" name="steamID"
                        value={userPayload.steamID} onChange={onInputChange} />
                        <FormError error={errors.steamID} />    
                    </label>
                </div>

                <div>
                    <input type="submit" className="button" value="Add Steam ID" />
                </div>
            </form>
        </div>

        <div className={`${defaultVisibility}`}>
            <h4>Your SteamID has been updated</h4>
        </div>

        
            {steamProfile}
        </div>
    )
}

export default SteamForm