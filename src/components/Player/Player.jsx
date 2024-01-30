/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./Player.module.css";

const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timestamp, setTimestamp] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");

  function playNextSong() {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  }
  function playPrevSong() {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  }
  function playPause() {
    setIsPlaying(!isPlaying);
  }

  function handleProgress({ played, playedSeconds }) {
    setProgress(played * 100);
    const formattedTimestamp = formatTimestamp(playedSeconds);
    setTimestamp(formattedTimestamp);
  }

  function handleDuration(duration) {
    const formattedDuration = formatTimestamp(duration);
    setTotalDuration(formattedDuration);
  }

  function formatTimestamp(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  //   function handleSeek(mouseEvent) {
  //     const { offsetX, target } = mouseEvent;
  //     const percent =
  //       target.clientWidth !== 0 ? (offsetX / target.clientWidth) * 100 : 0;
  //     setProgress(percent);
  //   }

  //   function handleSeekMouseUp(event) {
  //     const { offsetX, target } = event;
  //     const newTime =
  //       (offsetX / target.clientWidth) * songs[currentSongIndex].duration;

  //     if (
  //       isFinite(newTime) &&
  //       newTime >= 0 &&
  //       newTime <= songs[currentSongIndex].duration
  //     ) {
  //       // Use ReactPlayer's seekTo function to change the playback position
  //       // Seek to the new time in seconds
  //       playerRef.current.seekTo(newTime, "seconds");
  //     }
  //   }

  const playerRef = useRef();

  return (
    <section className={styles.playerContainer}>
      <img src="/ost.png" alt="" />
      <h2>{songs[currentSongIndex].name}</h2>
      <div className={styles.timestamp}>
        {timestamp} / {totalDuration}
      </div>
      <ReactPlayer
        ref={playerRef}
        className={styles.player}
        url={songs[currentSongIndex].url}
        controls={false}
        playing={isPlaying}
        onEnded={playNextSong}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.controls}>
        <button
          className={`${styles.btnClear} ${styles.btnSmall}`}
          onClick={playPrevSong}
        >
          <img
            className={styles.btnImg}
            src="/icons8-left-arrow-50.png"
            alt=""
          />
        </button>
        <button onClick={playPause} className={styles.btnClear}>
          <img
            src={isPlaying ? "/icons8-pause-50.png" : "/icons8-play-50.png"}
            alt=""
          />
        </button>
        <button
          className={`${styles.btnClear} ${styles.btnSmall}`}
          onClick={playNextSong}
        >
          <img
            className={styles.btnImg}
            src="/icons8-right-arrow-50.png"
            alt=""
          />
        </button>
      </div>
    </section>
  );
};

export default Player;
