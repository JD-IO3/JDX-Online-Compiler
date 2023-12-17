import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { toast } from 'react-hot-toast';
import Client from './Client';
import './Styles/editor.css';
import ACTIONS from '../socket/actions';


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

const EditorBox = forwardRef(({ output, setInput, fileName, playgroundId, isPlaygroundRoute, socketRef, clients, reactNavigator }, ref) => {
  const file = files[fileName];
  const editorRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    getCurrentText: () => {
      return editorRef.current ? editorRef.current.getValue() : '';
    },
  }));

  const initializeEditor = () => {
    const editor = editorRef.current;
  
    if (editor) {
      const onChangeModelContent = () => {
        const currentContent = editor.getValue();
        // console.log('Current content:', currentContent);
  
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { playgroundId, currentContent });
      };
  
      editor.onDidChangeModelContent(onChangeModelContent);
  
      return () => {
        editor.dispose();
        console.log('Detaching onDidChangeModelContent event');
      };
    }
  };

  if (isPlaygroundRoute) {


    useEffect(() => {
      // editorRef.current = window.localStorage.getItem(editorValue)
      initializeEditor()

      return () => {
        if (socketRef.current) {
          socketRef.current.off(ACTIONS.CODE_CHANGE);
        }
      }
      
    }, []);

    useEffect(() => {
      const editor = editorRef.current;
  
      if (editor && socketRef.current) {
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ currentContent}) => {
          if (currentContent !== null && currentContent !== editor.getValue()) {
            // changeFlag = false
            // console.log(1);
            editorRef.current.setValue(currentContent)
          }
        })
      }
      return () => {
        
      };
    }, [editorRef.current, socketRef.current]);
  }


  const handleInputChange = event => {
    setInput(event.target.value);
  };

  const copyPlaygroundId = async () => {
    try {
      await navigator.clipboard.writeText(playgroundId);
      toast('PlaygroundId has been copied to your clipboard.', {
        duration: 1300,
        position: 'top-center',

        icon: '🤨'
      })
    } catch (error) {
      console.log(error);
    }
  }

  const leavePlayground = () => {
    reactNavigator('/');
  }

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
          <button className="copy-btn btn" onClick={copyPlaygroundId} >Copy Playground Id</button>
          <button className="leave-btn btn" onClick={leavePlayground}>Leave Playground</button>

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
              // console.log(editorRef);
              initializeEditor()
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