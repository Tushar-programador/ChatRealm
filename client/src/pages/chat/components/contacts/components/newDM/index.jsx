import { useState, useCallback } from "react";
import { CONTACT_ROUTES } from "../../../../../../utils/constant";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "../../../../../../store";
import { Avatar, AvatarImage } from "../../../../../../components/ui/avatar";
import Lottie from "react-lottie";
import { FaPlus } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { Animation } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getcolors } from "../../../../../../lib/utils";

function NewDM() {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openNewContactModel, setOpenContactModel] = useState(false);
  const [searchContact, setSearchContact] = useState([]);
  const [loading, setLoading] = useState(false);

  const seacrchContact = useCallback(async (searchTerm) => {
    if (searchTerm.trim().length === 0) {
      setSearchContact([]);
      return;
    }
    try {
      setLoading(true);
      const response = await apiClient.post(
        CONTACT_ROUTES,
        { searchTerm: searchTerm },
        { withCredentials: true }
      );
      if (response.status === 200 && response.data) {
        setSearchContact(response.data);
      }
    } catch (error) {
      console.error("Error searching for contacts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectNewContact = useCallback(
    (contact) => {
      console.log(1);

      setOpenContactModel(false);
      setSelectedChatData(contact);
      setSelectedChatType("contact");
      setSearchContact([]);
    },
    [setSelectedChatType, setSelectedChatData]
  );

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setOpenContactModel((prev) => !prev)}
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 transition-all"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-full max-w-md h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
          </DialogHeader>

          <Input
            onChange={(e) => seacrchContact(e.target.value)}
            placeholder="Search Contacts"
            className="rounded-lg p-4 bg-[#2c2e3b] border-none mb-4"
          />

          {loading ? (
            <div className="flex-1 flex flex-col justify-center items-center transition-all duration-300">
              <Lottie
                isClickToPauseDisabled={true}
                width={100}
                height={100}
                options={Animation}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-3 items-center mt-5 text-xl text-center">
                <h3 className="poppins-medium">Searching...</h3>
              </div>
            </div>
          ) : searchContact.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center transition-all duration-300">
              <Lottie
                isClickToPauseDisabled={true}
                width={100}
                height={100}
                options={Animation}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-3 items-center mt-5 text-xl text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span> Search for a new{" "}
                  <span className="text-purple-500">Contact</span>
                </h3>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchContact.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.profileImage ? (
                          <AvatarImage
                            src={contact.profileImage}
                            alt="profile image"
                            className="object-cover h-full w-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getcolors(
                              contact.color
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.charAt(0)
                              : contact.email.charAt(0) || "U"}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-white">
                        {contact.firstName
                          ? `${contact.firstName} ${contact.lastName || ""}`
                          : contact.email}
                      </p>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewDM;
