import React, { useEffect } from 'react';
import './Styles/roompopup.css'

function RoomPopUp({ setPopUp }) {

  const handleCloseClick = () => {
    setPopUp((prevPopUp) => prevPopUp = !prevPopUp);
  }

  return (
    <>
      <div className="popup-box" >
        <div className="popup-container">
          <div className="header-container">
            <p>PLAYGROUND</p>
            <button className='close-btn' onClick={handleCloseClick} > X </button>
          </div>
          <div className="input-box-container">
            <input type="text" className='roomId-ip' placeholder='Enter Playground Id' />
            <input type="text" className='name-ip' placeholder='Enter Your Name' />
          </div>
          <div className="join-btn-container">
            <button className='join-btn' >Join Playground</button>
          </div>
          <div className="create-room-text">
            <p>Doesn't have a Playground Id? <br /> <br /> Create a New, <a href='#'>Playground</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomPopUp;
