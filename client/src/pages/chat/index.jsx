import { useAppStore } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Contacts from "./components/contacts";
import EmptyChatContainer from "./components/empty-contact-container";
import ChatContainer from "./components/chat-container";
function Chat() {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile before logging in");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <Contacts />

      {selectedChatType == "contact" ? (
        <ChatContainer />
      ) : (
        <EmptyChatContainer />
      )}
    </div>
  );
}

export default Chat;
