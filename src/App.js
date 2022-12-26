import React, { useState } from 'react'
import Header from './components/Header/Header'
import Timer from './components/Timer/Timer'
import List from './components/List/List'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowLeft, faBell as fasBell, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons"
import './App.css';

library.add(faArrowLeft, fasBell, farBell, faXmark);

function App() {
  let [contractions,setContractions] = useState([])

  return (
    <div className="App">
      <div className="Container">
        <Header /> 
        <Timer contractions={contractions} setContractions={setContractions}  /> 
        <List contractions={contractions} setContractions={setContractions}/> 
      </div>
    </div>
  );
}

export default App;
