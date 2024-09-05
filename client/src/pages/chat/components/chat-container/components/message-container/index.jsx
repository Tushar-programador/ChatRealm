import { useRef, useEffect } from "react";
import { useAppStore } from "../../../../../../store";
import moment from "moment";
import { apiClient } from "../../../../../../lib/api-client";
import { GET_MESSAGES } from "../../../../../../utils/constant";
import styles from "./MessageContainer.module.css";

function MessageContainer() {
  const scrollRef = useRef();
  const {
    selectedChatMessage,
    selectedChatData,
    selectedChatType,
    setSelectedChatMessage,
  } = useAppStore();

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_MESSAGES,
          { id: selectedChatData?._id }, // Use optional chaining here
          { withCredentials: true }
        );
        if (response.status === 200 && Array.isArray(response.data.messages)) {
          setSelectedChatMessage(response.data.messages);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedChatData?._id && selectedChatType === "contact") {
      getAllMessages();
    }
  }, [selectedChatData, setSelectedChatMessage, selectedChatType]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const renderMessage = () => {
    let lastDate = null;

    return selectedChatMessage.map((message, index) => {
      // Use optional chaining to prevent errors
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.createdAt).format("LL")}
            </div>
          )}
          {renderDMMesaage(message)}
        </div>
      );
    });
  };

  const renderDMMesaage = (messageObj) => {
    const message = messageObj.message || messageObj; // Use messageObj directly if messageObj is the message

    // Check if message or message content is undefined
    if (!message || !message.content) {
      console.log("Skipping a message due to undefined content", messageObj);
      return null;
    }

    const isSender = message.sender !== selectedChatData?._id;
    console.log(isSender);

    return (
      <div className={` ${isSender ? "text-right" : "text-left"}`}>
        <div
          className={`${
            isSender
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[70%] break-words`}
        >
          {message.content}
        </div>
        <div className="text-xs text-gray-500 ml-5 mt-1">
          {moment(message.createdAt).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${styles.customScrollbar} flex-1 overflow-y-auto  p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full1`}
    >
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageContainer;
