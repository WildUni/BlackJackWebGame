import React from "react";
import StandButton from "./standButton";
import HitButton from "./hitButton";
import DoubleButton from "./doubleDown";
import BettingArea from "./bettingArea";

const PlayerControls = (props:{playerID: string, handID: number, owns: boolean, gameState: string}) =>{
    const {playerID, owns, gameState, handID} = props;
    switch(gameState){
        case "BETTING":
            return(
        <BettingArea playerID = {playerID} handID = {handID} owns={owns} gameState = {gameState}></BettingArea>
        )
        case "CIRCULATING":
            const controlTypes = [StandButton, HitButton, DoubleButton];
            
            return owns ? (
                <div className="controlPanel">{controlTypes.map((ControlComponent, index)=>(<ControlComponent key={index} playerID = {playerID} handID = {handID} gameState={gameState}></ControlComponent>))}</div>
            ): <p>Waiting for {playerID} to take their turn</p>
        case "REVEAL":
            return <p>The Host is revealing their cards!</p>
        }
}

export default PlayerControls;