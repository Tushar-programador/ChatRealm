import { getcolors } from "../../lib/utils";
import { useAppStore } from "../../store";
import { Avatar, AvatarImage } from "./avatar";

export function ContactList({ contacts, isChannel = false }) {
  const contactList = contacts;
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessage,
    selectedChatType,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessage([]);
    }
    console.log(selectedChatType);
  };

  return (
    <div
      className="mt-5"
      style={{
        overflowY: "auto",
        scrollbarWidth: "thin", // For Firefox
        scrollbarColor: "#8417ff #f1f1f111", // For Firefox
      }}
    >
      {contactList.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 mt-1 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          } `}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden m-1">
              {isChannel ? (
                <div
                  className={`h-12 w-12 flex items-center justify-center rounded-full ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? "bg-[#ffffff22] border border-white/70"
                      : "bg-[#8417ff]"
                  }`}
                >
                  #
                </div>
              ) : contact?.profileImage ? (
                <AvatarImage
                  src={contact.profileImage}
                  alt="profile image"
                  className="object-cover h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`
                  ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? "bg-[#ffffff22] border border-white/70"
                      : getcolors(contact?.color)
                  }
                  uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full `}
                >
                  {contact?.firstName
                    ? contact.firstName.charAt(0)
                    : contact?.email.charAt(0) || "U"}
                </div>
              )}
            </Avatar>
            <span>
              {isChannel
                ? contact.name
                : `${contact.firstName} ${contact.lastName}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
<style>
  {`
  /* For WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f111; /* Background of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #8417ff; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Round the corners of the scrollbar thumb */
    border: 2px solid transparent; /* Optional: adds a small gap around the thumb */
    background-clip: content-box; /* Ensures the border is visible */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #6a12cc; /* Darker color when hovered */
  }
  `}
</style>;
