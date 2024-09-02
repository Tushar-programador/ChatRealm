import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { useState, useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { colors, getcolors } from "../../lib/utils";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import {
  deleteProfileRoute,
  UpdateUserInfo,
  uploadProfileRoute,
} from "../../utils/constant";

function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState(null);
  const [hover, setHover] = useState(null);
  const [selectColor, setSelectColor] = useState(0);
  const fileInputUpload = useRef(null);

  useEffect(() => {
    // Ensure that userInfo is properly loaded before setting state values
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setSelectColor(userInfo.color || 0);
      setImage(userInfo.profileImage || null); // Load existing profile image if available
    }
  }, [userInfo]);

  const validateData = () => {
    if (!firstName) {
      toast.error("Please enter your first name");
      return false;
    }
    if (!lastName) {
      toast.error("Please enter your last name");
      return false;
    }
    if (firstName.length < 3) {
      toast.error("First name must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateData()) {
      try {
        const response = await apiClient.post(
          UpdateUserInfo,
          {
            firstName,
            lastName,
            color: selectColor,
          },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data.user });
          toast.success(response.data.message);
          navigate("/chat");
        } else {
          toast.error(response.data.message || "Failed to update profile");
        }
      } catch (error) {
        toast.error("An error occurred while updating the profile.");
        console.error("Error in saveChanges:", error);
      }
    }
  };

  const navigateback = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Set up your profile first");
    }
  };

  const handleImageUpload = () => {
    fileInputUpload.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      try {
        const response = await apiClient.post(uploadProfileRoute, formData, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.image) {
          // Directly update the image in both states for immediate reflection

          setUserInfo({ ...userInfo, profileImage: response.data.image });
          setImage(response.data.image); // Update the image for immediate preview
          // Update the image on the server as well
          toast.success("Profile image updated successfully");
          console.log(userInfo);
        }

        // Preview the image while it's being uploaded
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result); // Preview image
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Failed to upload image.");
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    setImage(userInfo.profileImage);
    console.log("image uploaded and set");
  }, [userInfo, image]);

  const handleImageDelete = async () => {
    setImage(null);
    const response = await apiClient.delete(deleteProfileRoute, {
      withCredentials: true,
    });
    if (response.status === 200 && response.body) {
      setUserInfo({ ...userInfo, profileImage: null }); // Optionally remove image on the server
      toast.success("Profile image removed successfully");
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:max-w-[60vw]">
        <div>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={() => navigateback()}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div
            className="relative h-full w-32 md:w-48 md:h-48 flex items-center justify-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile image"
                  className="object-cover h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getcolors(
                    selectColor
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0)
                    : userInfo?.email?.charAt(0) || "U"}
                </div>
              )}
            </Avatar>
            {hover && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                onClick={image ? handleImageDelete : handleImageUpload}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              name="profileImage"
              id="profile"
              ref={fileInputUpload}
              onChange={handleImageChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.svg,.webp"
            />
          </div>
          <div className="flex flex-col gap-5 text-white">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg p-4 bg-[#2c2e3b]"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg p-4 bg-[#2c2e3b]"
            />
            <Input
              type="email"
              placeholder="Email"
              value={userInfo?.email}
              readOnly
              className="rounded-lg p-4 bg-[#2c2e3b]"
            />
            <div className="flex gap-5 w-full">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectColor === index
                      ? " outline outline-white/40 outline-2"
                      : ""
                  }`}
                  onClick={() => setSelectColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-500 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
