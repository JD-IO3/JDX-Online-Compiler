import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { v4 as uuidV4 } from 'uuid';
import './Styles/roompopup.css';

function RoomPopUp({ setPopUp, username, setUserName, setPlaygroundId, playgroundId }) {

  const navigate = useNavigate();

  const handleCloseClick = () => {
    setPopUp((prevPopUp) => prevPopUp = !prevPopUp);
  }

  const handleJoinPlayground = () => {

    if (!playgroundId || !username) {
      toast('You Forgot Username or Playground Id?', {
        duration: 1300,
        position: 'top-center',

        icon: '🤨'
      })
    }

    //?Redirect
    if (playgroundId && username) {
      navigate(`/playground/${playgroundId}`, {
        state: {
          username,
        }
      })
    }

  }

  const handleNewPgClick = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setPlaygroundId((prevplaygroundId) => prevplaygroundId = id)

    toast('New Playgrouond Constructed!!', {
      duration: 1300,
      position: 'top-center',

      icon: '🤠'
    })
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
            <input type="text" className='roomId-ip' placeholder='Enter Playground Id' onChange={(e) => setPlaygroundId((prevplaygroundId) => prevplaygroundId = e.target.value)} value={playgroundId} />
            <input type="text" className='name-ip' placeholder='Enter Your Name' onChange={(e) => setUserName((prevusername) => prevusername = e.target.value)} value={username} />
          </div>
          <div className="join-btn-container">
            <button className='join-btn' onClick={handleJoinPlayground} >Join Playground</button>
          </div>
          <div className="create-room-text">
            <p>Doesn't have a Playground Id? <br /> <br /> Create a New, <a onClick={handleNewPgClick} href='#'>Playground</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomPopUp;
