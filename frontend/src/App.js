import './App.css';
import Navbar from "./components/Header/Navbar";
import React from "react";
import {Outlet} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default App;
