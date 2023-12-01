import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import './Styles/roompopup.css'

function RoomPopUp({ setPopUp, username, setUserName, setPlaygroundId, playgroundId  }) {

  const handleCloseClick = () => {
    setPopUp((prevPopUp) => prevPopUp = !prevPopUp);
  }

  const handleNewPgClick = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setPlaygroundId((prevplaygroundId) => prevplaygroundId = id)
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
            <input type="text" className='roomId-ip' placeholder='Enter Playground Id' onChange={ (e) => setPlaygroundId((prevplaygroundId) => prevplaygroundId = e.target.value) } value={ playgroundId } />
            <input type="text" className='name-ip' placeholder='Enter Your Name' onChange={ (e) => setUserName((prevplaygroundId) => prevplaygroundId = e.target.value) } value={ username } />
          </div>
          <div className="join-btn-container">
            <button className='join-btn' >Join Playground</button>
          </div>
          <div className="create-room-text">
            <p>Doesn't have a Playground Id? <br /> <br /> Create a New, <a onClick={ handleNewPgClick } href='#'>Playground</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomPopUp;
