import { useEffect, useState } from "react";
import api from "../server/api";

function UserDrawer({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    if (!user?._id) return;

    const fetchMessages = async () => {
      const res = await api.get(`/admin/messages/${user._id}`);
      setMessages(res.data || []);
      await api.patch(`/admin/messages/read/${user._id}`);
    };

    fetchMessages();
  }, [user]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await api.post("/admin/messages/send", {
      receiverId: user._id,
      message: text,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!user) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl flex flex-col z-50">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`max-w-[75%] px-3 py-2 rounded text-sm ${
              m.senderRole === "admin"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white border"
            }`}
          >
            {m.message}
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default UserDrawer;
