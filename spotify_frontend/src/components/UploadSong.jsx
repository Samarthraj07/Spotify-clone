import { useState } from "react";
import { Icon } from "@iconify/react";
//import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconNameBox from "../utilities/IconNameBox";
import TextWithHover from "../utilities/TextWithHover";
import InputBox from "../utilities/InputBox";
import CloudinaryUpload from "../utilities/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer"

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const Navigate = useNavigate();

  const submitSong = async () => {
    // console.log(name)
    // console.log(thumbnail)
    // console.log(playlistUrl)
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.error) {
      alert("Could not upload the song!");
      return;
    }
    alert("success");
    Navigate("/home");
  };
  return (
   <LoggedInContainer>
      <div className="content p-7 pt-0 overflow-auto">
          <div className="text-white font-semibold text-2xl mb-5 p-3">
            Upload your Songs
          </div>
          <div className="flex">
            <InputBox
              label={"Title"}
              placeholder={"Title"}
              value={name}
              setValue={setName}
              lableColor={"text-white"}
            />
            <InputBox
              label={"Thumbnail"}
              placeholder={"Thumbnail"}
              value={thumbnail}
              setValue={setThumbnail}
              lableColor={"text-white"}
            />
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="bg-white rounded-full p-3 w-1/3">
                {uploadedSongFileName.substring(0, 30)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="submitButton bg-white w-40 p-3 flex cursor-pointer items-center justify-center rounded-full font-semibold"
            onClick={submitSong}
          >
            Submit song
          </div>
        </div>
   </LoggedInContainer>
  );
};

export default UploadSong;
