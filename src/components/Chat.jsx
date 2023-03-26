import React from "react";
import TextEditor from "./TextEditor";
import TicketInfo from "./TicketInfo";
import SingleMessage from "./SingleMessage";

const Chat = ({ ...props }) => {
  return (
    <div className="chat_container">
      <div className="inner_chat_container">
        <div className="inner_chat_messages_container">
          <TicketInfo {...props} />

          {[1, 1, 1, 1, 1].map(() => {
            return <SingleMessage />;
          })}
        </div>
        <div className="textbox_container">
          <TextEditor />
        </div>
      </div>
    </div>
  );
};

export default Chat;
