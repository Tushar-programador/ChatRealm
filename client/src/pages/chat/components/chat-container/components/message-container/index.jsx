import { useRef, useEffect } from "react";
import { useAppStore } from "../../../../../../store";
import moment from "moment";

function MessageContainer() {
  const scrollRef = useRef();
  const { selectedChatMessage, selectedChatData } = useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const renderMessage = () => {
    let lastDate = null;

    return selectedChatMessage.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {renderDMMesaage(message)}
        </div>
      );
    });
  };

  const renderDMMesaage = (message) => {
    const isSender = message.message.sender._id !== selectedChatData._id;

    console.log("isSender   " + isSender);
    console.log("message.sender._id   " + message.message.sender._id);
    console.log("selectedChatData._id   " + selectedChatData._id);
    return (
      <div
        className={`  ${
          message.message.sender._id !== selectedChatData._id
            ? " text-right"
            : " text-left"
        }`}
      >
        <div
          className={`${
            isSender
              ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
              : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]"
          } border inline-block p-4 rounded my-1 max-w-[70%] break-words`}
        >
          {message.message.content}
        </div>
        <div className="text-xs text-gray-500 ml-5 mt-1">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageContainer;
