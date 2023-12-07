import React, { forwardRef, useRef, useImperativeHandle,useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import Client from './Client';
import './Styles/editor.css';


const files = {
  "cpp": {
    language: "cpp",
    value: '#include <iostream>    \n\nint main() {        \n  // Write C++ code here        \n  std::cout << "Hello world!";        \n  return 0;    \n}',
  },
  "java": {
    language: "java",
    value: 'class Main {      \n  public static void main(String[] args) {          \n    System.out.println("Hello, World!");      \n  }  \n}',
  },
  "py": {
    language: "python",
    value: 'print("Hello World")',
  },
  "go": {
    language: "go",
    value: 'package main    \nimport "fmt"    \n    \nfunc main() {      \n fmt.Println("Hello World!")    \n}',
  },
  "c": {
    language: "c",
    value: '#include <stdio.h> \n \nint main() {\n  // Write C code here\n  printf("Hello world");\n  return 0;\n}',
  },
  "cs": {
    language: "csharp",
    value: 'using System;    \n\npublic class HelloWorld    \n{        \n  public static void Main(string[] args){            \n     Console.WriteLine ("Hello Mono World");        \n  }    \n}',
  },
}

const EditorBox = forwardRef(({ output, setInput, fileName, isPlaygroundRoute, clients }, ref) => {
  const file = files[fileName];
  const editorRef = useRef(null);
  // const [isUserChange, setIsUserChange] = useState(false);

  useImperativeHandle(ref, () => ({
    getCurrentText: () => {
      return editorRef.current ? editorRef.current.getValue() : '';
    },
  }));

  if (isPlaygroundRoute) {
    useEffect(() => {
      if (editorRef.current) {
        const editor = editorRef.current;
  
        console.log('Attaching onDidChangeModelContent event');
  
        const onChangeModelContent = (event) => {
          console.log('Editor content changed:', event);
          const currentContent = editor.getValue();
          console.log('Current content:', currentContent);
  
        };
  
        editor.onDidChangeModelContent(onChangeModelContent);
  
        return () => {
          editor.dispose(); 
          console.log('Detaching onDidChangeModelContent event');
        };
      }
    }, [editorRef.current]);
  }


  const handleInputChange = event => {
    setInput(event.target.value);
  };

  return (
    <>
      <div className={`editor-container ${isPlaygroundRoute ? 'editor-con-plg' : ''}`}>
        {isPlaygroundRoute && <div className="aside">

          <div className="asideInner">
            <h3>Connected</h3>
            <div className="clientsList">
              {
                clients.map(client => <Client key={client.socketId} username={client.username} />)
              }
            </div>
          </div>
          <button className="copy-btn btn">Copy Playground Id</button>
          <button className="leave-btn btn">Leave Playground</button>

        </div>}
        <div className="editor-box">
          <Editor
            height='100%'
            width='100%'
            theme='hc-black'
            language={file.language}
            value={file.value}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
        <div className={`res-container ${isPlaygroundRoute ? 'plg-res' : ''}`}>
          <div className="output-box">
            <h2>Output</h2>
            <textarea name="op-area" id="op-area" value={Object.keys(output) + ':\n\t' + Object.values(output)} readOnly ></textarea>
          </div>
          <div className="input-box">
            <h2>Input</h2>
            <textarea name="ip-area" id="ip-area" onChange={handleInputChange} ></textarea>
          </div>
        </div>
      </div>
    </>
  );
});

export default EditorBox;