import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import { PlayerProvider } from "./player-context";

const App = () => {
    //need to implement authentication: 
    return (
        <PlayerProvider>
            <Outlet/>
        </PlayerProvider>
    );
};

export default App;
