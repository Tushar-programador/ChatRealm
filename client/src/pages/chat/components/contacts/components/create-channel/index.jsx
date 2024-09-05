import { useState, useEffect } from "react";
import {
  GET_ALL_CONTACT_ROUTES,
  CREATE_CHANNEL,
} from "../../../../../../utils/constant";
import { apiClient } from "@/lib/api-client";
import { FaPlus } from "react-icons/fa";
import MultipleSelector from "../../../../../../components/ui/multi-select.jsx";
import { Button } from "../../../../../../components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "../../../../../../store";

function CreateChannel() {
  const { addChannel } = useAppStore();
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [allContacts, setAllContacts] = useState([]);

  const [channelName, setChannelName] = useState("");
  const [selectContacts, setSelectContacts] = useState([]);

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACT_ROUTES, {
          withCredentials: true,
        });
        console.log(response);
        setAllContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getContact();
  }, []);

  const handleChannelCreation = async () => {
    try {
      if (channelName.length > 0 || selectContacts.length > 0) {
        const response = await apiClient.post(
          CREATE_CHANNEL,
          {
            name: channelName,
            members: selectContacts.map((contact) => contact.value),
          },
          {
            withCredentials: true,
          }
        );
        if ((response.status === 201, response.data)) {
          setChannelName("");
          setSelectContacts([]);
          setNewChannelModel(false);
          addChannel(response.data.channel);
        }
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setNewChannelModel((prev) => !prev)}
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 transition-all"
            /> 
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-full max-w-md h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please fill the details</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Channel Name"
              value={channelName}
              className="rounded-lg p-4 bg-[#2c2e3b] border-none mb-4"
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-3 text-white"
              defaultOptions={allContacts}
              placeholder="Search Contact"
              value={selectContacts}
              onChange={setSelectContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                  No result found
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 "
              onClick={handleChannelCreation}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateChannel;
