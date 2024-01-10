import React, { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SongCard from "../utilities/SongCard";

const SearchPage = () => {
  const [searchtext, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    try {
      const response = await makeAuthenticatedGETRequest(
        "/song/get/" + searchtext
      );
      setSongData(response.data);
    } catch (error) {}
  };
  return (
    <LoggedInContainer currentActiveScreen="search">
      <div className=" mt-4  items-center ">
        <div className="flex items-center  space-x-2 w-1/3 p-2 px-5 rounded-full bg-gray-800  border border-gray-500 outline-none text-white text-sm hover:border-white">
          <Icon icon="carbon:search" className="text-xl cursor-pointer" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="outline-none w-full bg-gray-800 "
            value={searchtext}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        
       {
        songData.length>0?
        <div className="songs mt-5 space-y-3 ">
        <div className=" text-white">
          Search result for '{searchtext}' are:
        </div>
          {songData.map((item) => {
            return (
              <SongCard
                info={item}
                key={JSON.stringify(item)}
                playSound={() => {}}
              />
            );
          })}
        </div>: <div>{searchtext.length>0? <div className="text-white mt-5">No results for {searchtext}</div>: <div></div>}</div>
       }
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
