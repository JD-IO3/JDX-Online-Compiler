import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import ToolBar from '../Components/ToolBar';
import EditorBox from '../Components/EditorBox';
import RoomPopUp from '../Components/RoomPopUp';

function MainEditor({ language, setLanguage, setOutput, fileName, setFileName, setInput, output, editorRef, handleRunClick, }) {
  const [popup, setPopUp] = useState(false);

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
      <ToolBar setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} setPopUp={setPopUp} />
      {popup && <RoomPopUp setPopUp={setPopUp} />}
      <EditorBox output={output} fileName={fileName} ref={editorRef} setInput={setInput} />
    </>
  )
}

export default MainEditor
