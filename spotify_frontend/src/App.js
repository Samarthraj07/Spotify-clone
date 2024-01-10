import './App.css';
import './output.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import MyMusic from "./components/MyMusic"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import LoggedInHome from './components/LoggedInHome';
import UploadSong from './components/UploadSong';
import SongContext from './contexts/SongContext';
import { useState } from 'react';
import SearchPage from './components/SearchPage';
import Library from './components/Library';
import PlaylistView from './components/PlaylistView';

function App() {
  
  const [cookie, setCookie] = useCookies(["token"])
  const [currentSong, setCurrentSong] = useState(null)
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  
  return (
    <div className="w-screen h-screen font-poppins">
    <BrowserRouter>
    
    { cookie.token ? (
       <SongContext.Provider
       value={{
           currentSong,
           setCurrentSong,
           soundPlayed,
           setSoundPlayed,
           isPaused,
           setIsPaused,
       }}
   >
       <Routes> 
      <Route path='/home' element={<LoggedInHome/>}/>
      <Route path='/library' element={<Library/>}/>
      <Route path='/playlist/:playlistId' element={<PlaylistView/>}/>
      <Route path='/mysongs' element={<MyMusic/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/uploadSong' element={<UploadSong/>}/>
      <Route path='*' element={<Navigate to={"/home"}/>}/>
      </Routes>
      </SongContext.Provider>
    ): (<Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='*' element={<Navigate to={"/login"}/>}/>
    </Routes>)}
  </BrowserRouter>
  </div>
  );
}

export default App;
