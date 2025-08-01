import React from "react";

const HitButton = (props:{playerID: string, handID:number, gameState: string})=>{
    return(
           <button className='game-btn hit-btn'>Hit</button>
    )
}

export default HitButton;