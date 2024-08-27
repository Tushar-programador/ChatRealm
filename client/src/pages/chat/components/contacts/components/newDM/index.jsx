import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { Animation } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { CONTACT_ROUTES } from "../../../../../../utils/constant";
import { apiClient } from "@/lib/api-client";

function NewDM() {
  const [openNewContactModel, setOpenContactModel] = useState(false);
  const [searchContact, setSearchContact] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchContact = useCallback(
    async (searchTerm) => {
      if (searchTerm.trim().length === 0) {
        setSearchContact([]);
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.post(
          CONTACT_ROUTES,
          { searchTerm },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data) {
          setSearchContact(response.data.contacts || []);
        }else{
            setSearchContact(setSearchContact([]))
        }
      } catch (error) {
        console.error("Error searching for contacts:", error);
      } finally {
        setLoading(false);
      }
    },
    [setSearchContact]
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
            onChange={(e) => handleSearchContact(e.target.value)}
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
            <ScrollArea className="h-12 w-12 rounded-full overflow-hidden">
            {
                searchContact.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      // Add new DM logic here
                    }}
                    className="flex gap-3 items-center justify-between px-10 py-3 hover:bg-[#222329] transition-all duration-300"
                  >
                    <img
                      src={contact.image}
                      alt="contact"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white poppins-medium">{contact.name}</h3>
                      <p className="text-opacity-80 text-white poppins-light">
                        {contact.lastMessage?.text}
                      </p>
                    </div>
                  </div>
                ))

  
            }
             
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewDM;
