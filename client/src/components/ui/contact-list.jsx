import { getcolors } from "../../lib/utils";
import { useAppStore } from "../../store";
import { Avatar, AvatarImage } from "./avatar";

function ContactList({ contacts, isChannel = false }) {
  const contactList = contacts;
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessage,
  } = useAppStore();
  console.log("contacts");
  console.log(contacts);
  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessage([]);
    }
  };

  return (
    <div className="mt-5">
      {contactList.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : " hover:bg-[#f1f1f111]"
          } `}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden m-1">
                {contact?.profileImage ? (
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
                    }
                    uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full `}
                  >
                    {contact?.firstName
                      ? contact.firstName.charAt(0)
                      : contact?.email.charAt(0) || "U"}
                  </div>
                )}
              </Avatar>
            )}{" "}
            {isChannel && (
              <div className="h-10 bg-[#ffffff22] w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
