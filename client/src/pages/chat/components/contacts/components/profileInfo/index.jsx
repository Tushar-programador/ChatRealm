import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import { getcolors } from "../../../../../../lib/utils";
import { useAppStore } from "../../../../../../store";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { apiClient } from "../../../../../../lib/api-client";
import { useNavigate } from "react-router-dom";
import { logoutRoute } from "../../../../../../utils/constant";

function ProfileInfo() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  console.log("userInfo in profile");
  console.log(userInfo);


  
  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        logoutRoute,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUserInfo(null);
        navigate("/auth");
      }
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="absolute bottom-0 h-20 flex items-center justify-between px-4 sm:px-6 md:px-10 w-full bg-[#2a2b33]">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
          {userInfo.profileImage ? (
            <AvatarImage
              src={userInfo.profileImage} // Ensure this matches what was set in handleImageChange
              alt="profile image"
              className="object-cover h-full w-full bg-black"
            />
          ) : (
            <div
              className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getcolors(
                userInfo.color
              )}`}
            >
              {userInfo.firstName
                ? userInfo.firstName.charAt(0)
                : userInfo?.email?.charAt(0) || "U"}
            </div>
          )}
        </Avatar>
      </div>
      <div className="flex-1 text-center">
        {userInfo.firstName && userInfo.lastName ? (
          <div className="text-lg text-white font-bold truncate">
            {userInfo.firstName} {userInfo.lastName}
          </div>
        ) : (
          <div className="text-lg text-white font-bold truncate">
            {userInfo.email}
          </div>
        )}
      </div>
      <div className="flex gap-3 sm:gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                onClick={() => navigate("/profile")}
                className="text-purple-500 text-xl font-medium"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none outline-none">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoLogOut
                onClick={() => handleLogout()}
                className="text-red-500 text-xl font-medium"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none outline-none">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
