import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "../../../../../../store";
import { useSocket } from "../../../../../../context/socketContext";

function MessageBar() {
  const emojiRef = useRef();
  const socket = useSocket();
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const { selectedChatData, userInfo } = useAppStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      if (socket && selectedChatData) {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          receiver: selectedChatData._id,
          message: message,
          messageType: "text",
          fileUrl: undefined,
        });
        console.log("Message sent:", message);
        setMessage(""); // Clear the input after sending
      }
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setShowEmoji((prev) => !prev)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          {showEmoji && (
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                autoFocusSearch={false}
                onEmojiClick={handleEmoji}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-[#8417ff] flex justify-center items-center p-5 rounded-md focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
}

export default MessageBar;
