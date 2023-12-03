import { useState } from 'react';
import ToolBar from '../Components/ToolBar';
import EditorBox from '../Components/EditorBox';
import RoomPopUp from '../Components/RoomPopUp';

function MainEditor({ language, setLanguage, fileName, setFileName, setInput, output, editorRef, handleRunClick, username, setUserName, setPlaygroundId, playgroundId }) {
  const [popup, setPopUp] = useState(false);

  return (
    <>
      <ToolBar setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} setPopUp={setPopUp} />
      {popup && <RoomPopUp setPopUp={setPopUp} username={username} setUserName={setUserName} playgroundId={playgroundId} setPlaygroundId={setPlaygroundId} />}
      <EditorBox output={output} fileName={fileName} ref={editorRef} setInput={setInput} username={username} playgroundId={playgroundId} />
    </>
  )
}

export default MainEditor
