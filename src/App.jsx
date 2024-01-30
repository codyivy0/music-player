import "./App.css";
import Player from "./components/Player/Player.jsx"



function App() {
  const songs = [
    {
      name: "Home",
      url: "/home.mp3",
      img: '/ost.png'
    },
    {
      name: "Start Menu",
      url: "/start menu.mp3",
      img: '/ost.png'
    },
    {
      name: "MEGALOVANIA",
      url: "/MEGALOVANIA.mp3",
      img: '/ost.png'
    },
  ];

  return (
    <>
      <Player songs={songs} />
    </>
  );
}

export default App;
