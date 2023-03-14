import React from "react"
import GamePicture from '../assets/images/VideoGamePicture.jpeg'
import GamePicture2 from '../assets/images/VideoGamePicture2.jpeg'
import GamePicture3 from '../assets/images/VideoGamePicture3.jpeg'

const LandingPage = (props) => {

    return (
        <div>

            <div className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout welcome cell">
                        <h2 align="center" className="welcome">Welcome to myGamingList!</h2>
                    </div>
                </div>
            </div>

            <div align="center">


            <img id ="landingPicture" src = {GamePicture} />
            <img id ="landingPicture" src = {GamePicture2} />
            <img id ="landingPicture" src = {GamePicture3} />

            </div>

            <h5 align="center">Please log in/sign up to start making your own game list!</h5>

            <div className="grid-container">
                <div className="grid-x grid-margin-x">
                    <div className="callout welcome cell">
                        <h5 align="center" className="welcome">Here at myGamingList we strive to create a product that will be fun and easy to use for gamers of all kinds.</h5>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default LandingPage