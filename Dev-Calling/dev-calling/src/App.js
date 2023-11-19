import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/home";
import RoomPage from "./Components/room";
import Navbar from "./Components/navbar";
import JoinForm from "./Components/joinForm";
import OptionCard from "./Components/optionCard";



function App() {
  return (  
    <>
      <Navbar name="Dev-Calling" />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/one-to-one-call" element={<OptionCard/>} />
        <Route path="/group-call" element={<OptionCard/>} />

        <Route path="/join-a-call" element={<JoinForm title="Join a Call" Name="Enter Your Name" roomCode="Enter Room Code"/>} />
        <Route path="/create-a-call" element={<JoinForm title="Create a Call" Name="Enter Your Name" roomCode="Create a Room Code"/>} />


        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </>
  );
}

export default App;