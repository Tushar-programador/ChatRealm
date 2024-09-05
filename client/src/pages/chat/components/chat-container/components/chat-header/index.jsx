import { RiCloseFill } from "react-icons/ri";
import { useAppStore } from "../../../../../../store";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import { getcolors } from "../../../../../../lib/utils";

function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-6 md:px-12 lg:px-20">
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData?.profileImage ? (
                  <AvatarImage
                    src={selectedChatData.profileImage}
                    alt="profile image"
                    className="object-cover h-full w-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getcolors(
                      selectedChatData?.color
                    )}`}
                  >
                    {selectedChatData?.firstName
                      ? selectedChatData.firstName.charAt(0)
                      : selectedChatData?.email.charAt(0) || "U"}
                  </div>
                )}
              </Avatar>
            ) : (
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full `}
              >
                #
              </div>
            )}
          </div>
          <div className="text-white font-medium">
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && selectedChatData?.firstName
              ? `${selectedChatData.firstName} ${
                  selectedChatData?.lastName || ""
                }`
              : selectedChatData?.email}
          </div>
        </div>
        <button
          onClick={closeChat}
          className="text-neutral-500 hover:text-white transition-colors duration-300 focus:outline-none"
        >
          <RiCloseFill className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
