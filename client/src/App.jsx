import axios from 'axios';
import { useState, useRef } from 'react';
import './App.css';
import MainEditor from './Routes/MainEditor';

function App() {
  const [language, setLanguage] = useState('cpp');
  const [fileName, setFileName] = useState('cpp');
  const [input, setInput] = useState(null);
  const [output, setOutput] = useState({});
  const editorRef = useRef(null);

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

  return (
    <>
      <MainEditor setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} output={output} fileName={fileName} editorRef={editorRef} setInput={setInput} setOutput={setOutput} />
    </>
  )
}

export default App
