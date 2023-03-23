import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  const [message, setMessage] = useState();

  const onEditorStateChange = (editorState) => {
    setMessage(editorState);
  };

  return (
    <div className="editor_container">
      <Editor editorState={message} onEditorStateChange={onEditorStateChange} />
    </div>
  );
};

export default TextEditor;
