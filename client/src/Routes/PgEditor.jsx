import { useLocation } from 'react-router-dom';
import ToolBar from '../Components/ToolBar';
import EditorBox from '../Components/EditorBox';

function PgEditor({ language, setLanguage, fileName, setFileName, setInput, output, editorRef, handleRunClick, }) {

  const location = useLocation();
  const isPlaygroundRoute = location.pathname.startsWith('/playground/');

  return (
    <>
      <ToolBar setLanguage={setLanguage} setFileName={setFileName} handleRunClick={handleRunClick} isPlaygroundRoute={isPlaygroundRoute} />
      <EditorBox output={output} fileName={fileName} ref={editorRef} setInput={setInput} isPlaygroundRoute={isPlaygroundRoute} />
    </>
  )
}

export default PgEditor
