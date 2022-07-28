import React from "react";
import { AuthContext } from "../../App";
import ChatHeader from "./chatHeader/Chat_Header";
import Message from "./messages/Message";
import Conversation from "./conversations/Conversation";
import "./messaging.scss";
import ChatOnline from "./chatOnline/ChatOnline";
export default function HomePage() {
  //   const { token } = React.useContext(AuthContext);
  const auth = React.useContext(AuthContext);

  return (
    <>
      {/*<ChatHeader />
      <div>Authenticated as {auth?.email}</div>*/}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                //onChange={(e) => setNewMessage(e.target.value)}
                /*value={newMessage}*/
              ></textarea>
              <button className="chatSubmitButton" onClick={console.log()}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
