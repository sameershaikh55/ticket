import React from "react";
import TextEditor from "./TextEditor";
import TicketInfo from "./TicketInfo";
import SingleMessage from "./SingleMessage";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../redux/action/client/chat";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useRef } from "react";

const Chat = ({ ...props }) => {
  const { id } = useParams();
  const chatRef = useRef(null);

  const dispatch = useDispatch();

  const { chat, loading } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getChat(id));
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat]);

  return (
    <div className="chat_container">
      <div className="inner_chat_container">
        <div ref={chatRef} className="inner_chat_messages_container">
          <TicketInfo {...props} />

          {loading ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <HashLoader size={20} color="#21232f" />
            </div>
          ) : (
            chat?.messages?.map((content, i) => {
              return (
                <div key={i}>
                  <SingleMessage {...content} />
                </div>
              );
            })
          )}
        </div>
        <div className="textbox_container">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default Chat;
