import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainEditor from './Routes/MainEditor';
import PgEditor from './Routes/PgEditor';

function App() {
  const [language, setLanguage] = useState('cpp');
  const [fileName, setFileName] = useState('cpp');
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState({});
  const editorRef = useRef(null);

  const [playgroundId, setPlaygroundId] = useState(null);
  const [username, setUserName] = useState(null);

  const getCurrentText = () => {
    if (editorRef.current) {
      return editorRef.current.getCurrentText();
    }
    return '';
  }

  const handleRunClick = async () => {
    const editorContent = getCurrentText();

    const code = {
      code: editorContent,
      input: input,
      lang: language,
    }

    await axios.post('http://localhost:3000/compile', code)
      .then(function (response) {
        setOutput(response.data)
      })
      .catch(function (error) {
        setOutput(error)
      });

  };

  useEffect(() => {
    return () => {
      axios.get('http://localhost:3000/')
        .then(function (response) {
          setOutput(response.data)
        })
        .catch(function (error) {
          setOutput(error)
        });
    };
  }, [language]);

  return (
    <>
      <div><Toaster toastOptions={
        {
          style: {
            width: 'fit-content',
            background: '#000000',
            color: '#F3F518',
            border: '2px solid #2121DE',
            fontFamily: 'pixel',
            fontSize: '1.3rem',
            borderRadius: '0'
          },
        }
      } /></div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainEditor setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} output={output} fileName={fileName} editorRef={editorRef} setInput={setInput} setOutput={setOutput} username={username} setUserName={setUserName} playgroundId={playgroundId} setPlaygroundId={setPlaygroundId} />} ></Route>
          <Route path='/playground/:playgroundId' element={<PgEditor setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} output={output} fileName={fileName} editorRef={editorRef} setInput={setInput} setOutput={setOutput} username={username} setUserName={setUserName} playgroundId={playgroundId} setPlaygroundId={setPlaygroundId} />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
