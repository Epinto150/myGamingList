import React from "react"
import { faTrophy as solidTrophy} from "@fortawesome/free-solid-svg-icons";
import { faTrophy as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trophies = ({ trophies }) => {
  let icons = [];
    for (let i = 0; i < trophies; i++) {

        icons.push(<FontAwesomeIcon key={i} icon={solidTrophy} />)
    }

  return (
    <div className="trophy-icon">{icons}</div>
  )
}

export default Trophies