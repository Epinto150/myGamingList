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

    

    console.log(props.currentUser)

    const onSubmit = async (event) => {
        event.preventDefault()

        console.log(userPayload)
        
        
        setFormVisibility("invisible")
        setDefaultVisibility("visible")
        setSteamProfileArray([...steamProfileArray, userPayload])
        console.log(userPayload)

        console.log(steamProfileArray)

       
    }

    console.log(steamProfileArray)
    console.log(steamProfileArray.length)
    const steamProfile = steamProfileArray.map((payload) => {
        
            return (
            <div>
                <Steam currentUser={props.currentUser}
                userPayload={payload} errors={errors}/>
            </div>
            )
        
    })
       

    console.log(props.currentUser)
    console.log(userPayload)

    const onInputChange = (event) => {
        setUserPayload({ ...userPayload, [event.currentTarget.name]: event.currentTarget.value, 
        });
    };

    return (
        <div>

        <div className={`grid-container ${formVisibility}`} onSubmit={onSubmit}>
            <h1>Add Steam ID to your account!</h1>
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