import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
//import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconNameBox from "../utilities/IconNameBox";
import TextWithHover from "../utilities/TextWithHover";
import {
  Children,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import SongContext from "../contexts/SongContext";
import { Link, Navigate } from "react-router-dom";
import CreatePlaylist from "../modals/CreatePlaylist";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(SongContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (src) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [src],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="h-full w-full bg-app-black">
      {modalOpen ? (
        <CreatePlaylist
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      ) : (
        <></>
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        {/* This first div will be the left panel */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div>
            {/* This div is for logo */}
            <div className="logoDiv p-6">
              <Icon icon="logos:spotify" width="100" />
            </div>
            <div className="py-5">
              <IconNameBox
                iconName={"material-symbols:home"}
                displayText={"Home"}
                active={currentActiveScreen === "home"}
                targetLink={"/home"}
              />
              <IconNameBox
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                targetLink={"/search"}
                active={currentActiveScreen === "search"}
              />
              <IconNameBox
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                targetLink={"/library"}
                active={currentActiveScreen === "library"}
              />
              <IconNameBox
                iconName={"ri:music-fill"}
                displayText={"My Music"}
                targetLink={"/mysongs"}
                active={currentActiveScreen === "mysongs"}
              />
            </div>
            <div className="pt-5">
              <IconNameBox
                iconName={"material-symbols:add-box"}
                displayText={"Create Playlist"}
                onClick={() => {
                  setModalOpen(true);
                }}
              />
              <IconNameBox
                iconName={"mdi:cards-heart"}
                displayText={"Liked Songs"}
              />
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        {/* This second div will be the right part(main content) */}
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-3/5 flex justify-around items-center">
                <TextWithHover displayText={"Premium"} />
                <TextWithHover displayText={"Support"} />
                <TextWithHover displayText={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-2/5 flex justify-around h-full items-center">
                <Link to={"/uploadSong"}>
                  {" "}
                  <TextWithHover displayText={"Upload Song"} />
                </Link>
                <div className="bg-white h-10 w-10 p-3 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  SS
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="h-1/10 w-full bg-black bg-opacity-30 text-white flex  items-center px-4">
          <div className=" w-1/4 flex items-center ">
            <img
              src={currentSong.thumbnail}
              alt=""
              className="h-12 w-12 rounded m-1"
            />
            <div className="text-sm p-1">
              <div className="font-semibold cursor-pointer hover:underline py-1">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500">
                {currentSong.artist.firstname +
                  " " +
                  currentSong.artist.lastname}
              </div>
            </div>
          </div>
          <div className="middle w-1/2 h-full flex justify-center">
            <div className="controls flex justify-between w-1/3 items-center">
              <Icon
                icon="solar:shuffle-broken"
                fontSize={20}
                className="cursor-pointer"
              />
              <Icon
                icon="fluent:previous-16-filled"
                fontSize={20}
                className="cursor-pointer"
              />
              <Icon
                icon={isPaused ? "carbon:play-outline" : "carbon:pause-outline"}
                fontSize={30}
                className="cursor-pointer"
                onClick={() => {
                  togglePlayPause();
                }}
              />
              {/* <Icon icon="carbon:play-outline" /> */}
              <Icon
                icon="fluent:next-16-filled"
                fontSize={20}
                className="cursor-pointer"
              />
              <Icon
                icon="material-symbols:repeat"
                fontSize={20}
                className="cursor-pointer"
              />
            </div>
            <div className="progress-bar"></div>
          </div>
          <div className="end w-1/4 flex justify-end space-x-3">
            <Icon
              icon="material-symbols:playlist-add"
              width="30"
              height="30"
              className="cursor-pointer"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            <Icon icon="ph:heart" fontSize={30} className="cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
