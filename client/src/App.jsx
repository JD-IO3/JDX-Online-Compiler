import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainEditor from './Routes/MainEditor';
import PgEditor from './Routes/PgEditor';

function App() {
  const [language, setLanguage] = useState('cpp');
  const [fileName, setFileName] = useState('cpp');
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState({});
  const editorRef = useRef(null);

  const [playgroundId, setPlaygroundId] = useState('');
  const [username, setUserName] = useState('');

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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainEditor setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} output={output} fileName={fileName} editorRef={editorRef} setInput={setInput} setOutput={setOutput} username={username} setUserName={setUserName} playgroundId={playgroundId} setPlaygroundId={setPlaygroundId} />} ></Route>
          <Route path='/playground/:pgId' element={<PgEditor setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} output={output} fileName={fileName} editorRef={editorRef} setInput={setInput} setOutput={setOutput} username={username} setUserName={setUserName} setPlaygroundId={setPlaygroundId} />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
