import React, { useState, useEffect } from "react";
import api from "../server/api";
import socket from "../socket/socket";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";
import DashboardOverview from "../components/DashBoard";
import UserManagement from "../components/UserManagement";
import UserChatDrawer from "../components/ChatDrawer";
import NotificationPanel from "../components/Notification";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [users, setUsers] = useState([]);
  const [chatSummary, setChatSummary] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

 
  useEffect(() => {
    api.get("/admin/users").then((res) => {
      setUsers(res.data.users || []);
    }).catch(err => console.log("User fetch error", err));
  }, []);

  
 const fetchSummary = async () => {
  try {
    const res = await api.get("/messages/admin/messages");
    setChatSummary(res.data || []); 
  } catch (err) { 
    console.error("Summary fetch error", err); 
    setChatSummary([]); 
  }
};
  useEffect(() => {
    fetchSummary();
    socket.on("receive-message", fetchSummary);
    return () => socket.off("receive-message");
  }, []);


  useEffect(() => {
    const adminId = import.meta.env.VITE_ADMIN_ID; 
    if(adminId) socket.emit("join", adminId);
  }, []);

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-slate-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <Topbar onNotifClick={() => setIsNotifOpen(!isNotifOpen)} userCount={users.length} />

        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" && (
            <DashboardOverview 
              users={users} 
              chatSummary={chatSummary} 
              onViewUser={setSelectedUser} 
            />
          )}

          {activeTab === "users" && (
            <UserManagement 
              users={users} 
              onViewUser={setSelectedUser} 
            />
          )}
        </main>

        <NotificationPanel 
          open={isNotifOpen} 
          onClose={() => setIsNotifOpen(false)}
          onClickNotification={(id) => {
             const u = users.find(x => x._id === id);
             if(u) setSelectedUser(u);
             setIsNotifOpen(false);
          }}
        />
      </div>

      <UserChatDrawer 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </div>
  );
}