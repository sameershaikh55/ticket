import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearErrors } from "../redux/action/client/chat";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import SmallLoader from "./SmallLoader";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { ADD_CHAT_RESET } from "../redux/type/client/chat";

const TextEditor = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [message, setMessage] = useState(EditorState.createEmpty());

  const { singleTicket } = useSelector((state) => state.ticket);
  const { chat, chatLoading, success, chatError } = useSelector(
    (state) => state.chat
  );

  const onEditorStateChange = (editorState) => {
    setMessage(editorState);
  };

  // CONVERTING EDITOR OBJECT INTO HTML
  const convertIntoHtml = (value) => {
    return draftToHtml(convertToRaw(value.getCurrentContent()));
  };

  const auth = JSON.parse(localStorage.getItem("auth"));

  const sendMessage = () => {
    if (message) {
      dispatch(
        addMessage(
          {
            message: convertIntoHtml(message),
            createdAt: new Date().toISOString(),
            createdBy: auth.id,
          },
          chat.id
        )
      );

      setMessage(EditorState.createEmpty());
    } else {
      alert.error("Please enter text");
    }
  };

  useEffect(() => {
    if (chatError) {
      alert.error(chatError);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({ type: ADD_CHAT_RESET });
    }
  }, [dispatch, alert, success, chatError]);

  // Trigger sendMessage when Control and Enter keys are pressed
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      sendMessage();
    }
  };

  return (
    <div
      className={`editor_container ${
        (singleTicket?.status === "done" && "ticket_done") || ""
      }`}
    >
      <Editor
        editorState={message}
        onEditorStateChange={onEditorStateChange}
        onKeyDown={handleKeyDown}
      />

      <div className="d-flex justify-content-end">
        <button
          disabled={!chatLoading ? false : true}
          onClick={() => sendMessage()}
          className="px-3 rounded-2 py-1 border-0 f14"
        >
          {(chatLoading && <SmallLoader />) || "Send"}
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
