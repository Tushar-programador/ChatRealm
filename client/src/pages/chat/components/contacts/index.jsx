import { GET_CHANNELS, GET_CONTACT_ROUTES } from "../../../../utils/constant";
import NewDM from "./components/newDM";
import ProfileInfo from "./components/profileInfo";
import { apiClient } from "../../../../lib/api-client";
import { useEffect } from "react";
import { useAppStore } from "../../../../store";

import { ContactList } from "/src/components/ui/contact-list.jsx";
// import CreateChannel from "./components/create-channel";

function Contacts() {
  const {
    directMessageContact,
    setDirectMessageContact,
    // channels,
    setChannels,
  } = useAppStore();
  useEffect(() => {
    const getUserContact = async () => {
      const response = await apiClient.get(GET_CONTACT_ROUTES, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data) {
        setDirectMessageContact(response.data); // Update the direct message contact list in the store when the contacts are fetched from the API.
      }
    };
    const getChannel = async () => {
      const response = await apiClient.get(GET_CHANNELS, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data) {
        setChannels(response.data.channels);
      }
    };
    getUserContact();
    getChannel();
  }, [setChannels, setDirectMessageContact]);
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[30vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="flex items-center justify-between pr-10">
        <Title text="Direct Messages" />
        <NewDM />
      </div>
      <div className=" max-h-[60vh]  overflow-y-auto scrollbar-hidden">
        <ContactList contacts={directMessageContact} />
      </div>
      {/* <div className="flex items-center justify-between pr-10">
        <Title text="Channels" />
        <CreateChannel/>
      </div>
      <div className=" max-h-[38vh]  overflow-y-auto scrollbar-hidden">
        <ContactList contacts={channels} isChannel={true} />
      </div> */}
      <ProfileInfo />
    </div>
  );
}

export default Contacts;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>
      </svg>
      <span className="text-3xl font-semibold">Chat Realm</span>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
