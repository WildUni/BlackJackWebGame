import React from "react";
import "./buttonStyle.css";
const StandButton = (props:{playerID: string, handID:number, gameState: string})=>{
    //need to add effect for clicking 
    return(
           <button className='game-btn stand-btn'>Hit</button>
    )
}

export default StandButton;