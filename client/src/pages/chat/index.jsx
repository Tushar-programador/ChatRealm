import { useAppStore } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
function Chat() {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile before logging in");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
}

export default Chat;
