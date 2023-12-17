import LangSelect from './LangSelect';
import './Styles/toolbar.css';
import React from 'react';

export default function ToolBar({ handleRunClick, setLanguage, setFileName, setPopUp, playgroundId, isPlaygroundRoute, socketRef }) {

  const handlePopUpClick = () => {
    setPopUp((prevPopUp) => prevPopUp = !prevPopUp)
  }

  return (
    <>
      <div className='tool-container'>
        <img className='logo-img' src="/assets/images/jdx.svg" alt="no image" />
        <LangSelect setLanguage={setLanguage} setFileName={setFileName} socketRef={socketRef} isPlaygroundRoute={isPlaygroundRoute} playgroundId={playgroundId} />
        <nav className="tool-box">
          <button className={ `popup-btn ${isPlaygroundRoute ? 'plg' : ''}` } onClick={handlePopUpClick} >Playground</button>
          <div className="run-btn-container">
            <button className='run-btn' onClick={handleRunClick}><img src="/assets/images/play-pixel.svg" alt="no img" /></button>
          </div>
        </nav>
      </div>
    </>
  );
}
