import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";
import api from "../server/api";
import "./chat.css";

export default function AdminChat({ selectedUser }) {
  const [adminId, setAdminId] = useState(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    api.get("/messages/admin/basic").then(res => {
      setAdminId(res.data._id);
      socket.emit("join", res.data._id);
    });
  }, []);

  useEffect(() => {
    if (!selectedUser || !adminId) return;

    api.get(`/user/basic/${selectedUser}`).then(res => {
      setUserName(res.data.name);
    });

    api.get(`/messages/${selectedUser}`).then(res => {
      setMessages(res.data);
    });

    const handleReceive = (msg) => {
      if (
        (msg.senderId === selectedUser && msg.senderRole === "user") ||
        (msg.receiverId === selectedUser && msg.senderRole === "admin")
      ) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message", handleReceive);
  }, [selectedUser, adminId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msgData = {
      senderId: adminId,
      receiverId: selectedUser,
      message: text,
      senderRole: "admin"
    };

    socket.emit("send-message", msgData);
    setMessages(prev => [...prev, msgData]);
    setText("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>{userName || "Select User"}</span>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg ${m.senderRole === "admin" ? "me" : "other"}`}
          >
            {m.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
