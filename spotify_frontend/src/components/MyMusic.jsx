import { useEffect, useState } from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
//import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconNameBox from "../utilities/IconNameBox";
import TextWithHover from "../utilities/TextWithHover";
import InputBox from "../utilities/InputBox";
import CloudinaryUpload from "../utilities/CloudinaryUpload";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { Navigate } from "react-router-dom";
import SongCard from "../utilities/SongCard";
import LoggedInContainer from "../containers/LoggedInContainer";


const MyMusic = () => {
    
    const [songData, setSongData] = useState([]);
    useEffect(() => {
    //fetching data
    const getdata = async () => {
        const response = await makeAuthenticatedGETRequest("/song/get/mySongs")
        setSongData(response.data)
    }
     getdata()
    }, [])
    return (

        <LoggedInContainer currentActiveScreen="mysongs">
            <div className="text-white text-lg font-semibold pb-4 pl-2 pt-6">
                       My Songs                   </div>
                <div className="space-y-3 overflow-auto">
                {songData.map((item) => {
                    return <SongCard info={item} playSound={()=>{}} />;
                })}
                </div>
        </LoggedInContainer>
    )
}






export default MyMusic;