import React from "react";
import "./buttonStyle.css";
const StandButton = (props:{playerID: string, handID:number, gameState: string})=>{
    return(
           <button className='game-btn stand-btn'>Hit</button>
    )
}

export default StandButton;