// import axios from 'axios';
import LangSelect from './LangSelect';
import './Styles/toolbar.css';
import React from 'react';

export default function ToolBar({ handleRunClick, setLanguage, setFileName, setPopUp }) {

  const handlePopUpClick = () => {
    setPopUp((prevPopUp) => prevPopUp = !prevPopUp)
  }

  return (
    <>
      <div className='tool-container'>
        <img className='logo-img' src="src/assets/images/jdx.svg" alt="no image" />
        <LangSelect setLanguage={setLanguage} setFileName={setFileName} />
        <nav className="tool-box">
          <button className="popup-btn" onClick={handlePopUpClick} >Playground</button>
          <div className="run-btn-container">
            <button className='run-btn' onClick={handleRunClick}><img src="src/assets/images/play-pixel.svg" alt="no img" /></button>
          </div>
        </nav>
      </div>
    </>
  );
}
