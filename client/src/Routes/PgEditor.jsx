import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import ToolBar from '../Components/ToolBar';
import EditorBox from '../Components/EditorBox';
import { toast } from 'react-hot-toast';
import { initSocket } from '../socket/socket';
import ACTIONS from '../socket/actions';

function PgEditor({ language, setLanguage, fileName, setFileName, setInput, output, editorRef, handleRunClick, username }) {

  const { playgroundId } = useParams();

  const socketRef = useRef(null);
  const reactNavigator = useNavigate();

  const location = useLocation();
  const isPlaygroundRoute = location.pathname.startsWith('/playground/');

  const [clients, setClients] = useState([]);


  useEffect(() => {
    function init() {
      socketRef.current = initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        // toast. error('Socket connection failed, try again later. ');
        toast('Connection to PlayGround failed, try again later.', {
          duration: 1300,
          position: 'top-center',

          icon: '🤨'
        })
        reactNavigator('/');
      }

      socketRef.current.on('connect', () => {
        // console.log('connect', socketRef.current.connected);
        // automatically join the room
        socketRef.current.emit(ACTIONS.JOIN, {
          playgroundId,
          username: location.state?.username
        });
       });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast(`${username} joined the PlayGround.`, {
            duration: 1300,
            position: 'top-center',

            icon: '🤨'
          })
        }
        setClients((prevClients) => prevClients = clients)
        console.log(socketId)
      })

      //?Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast(`${username} left the PlayGround.`, {
          duration: 1300,
          position: 'top-center',

          icon: '🤨'
        })
        console.log('disconnected -> ', socketId)
        setClients((prevClients) => {
          return prevClients.filter(client => client.socketId !== socketId)
        })
      })
      // console.log(1);
    };

    init();
    // console.log(2);

    return () => {
      // console.log(3);
      if(socketRef.current){
        socketRef.current.off('connect_error');
        socketRef.current.off('connect_failed');
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.disconnect();
      }
      
    };
  }, []);

  if (isPlaygroundRoute) {
    if (!location.state) {
      return <Navigate to='/' />
    }
  }

  return (
    <>
      <ToolBar setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} isPlaygroundRoute={isPlaygroundRoute} socketRef={socketRef} playgroundId={playgroundId} />
      <EditorBox output={output} fileName={fileName} ref={editorRef} setInput={setInput} isPlaygroundRoute={isPlaygroundRoute} playgroundId={playgroundId} username={username} location={location} socketRef={socketRef} reactNavigator={reactNavigator} clients={clients} />
    </>
  )
}

export default PgEditor
