import { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "../store/playerStore";
import { Slider } from "./Slider";

export const Pause = ({ className }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = ({ className }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden ">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-bold block">{title}</h3>
        <p className="text-zinc-300 text-xs">{artists?.join(", ")}</p>
      </div>
    </div>
  );
};

export const VolumeSilenceIcon = ({ onClick }) => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="Volume Muted"
    viewBox="0 0 16 16"
    onClick={onClick}
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

export const VolumeIcon = ({ onClick }) => (
  <svg
    fill="currentColor"
    role="presentation"
    height="16"
    width="16"
    aria-hidden="true"
    aria-label="High Volume"
    viewBox="0 0 16 16"
    onClick={onClick}
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.current.currentTime);
    };

    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  const handleSliderChange = (value) => {
    audio.current.currentTime = value;
  };

  const formatTime = time => {
    if (time === null) return '0,00'
    
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = audio?.current?.duration || 0;

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50">{formatTime(currentTime)}</span>
      <Slider
        value={[currentTime]}
        defaultValue={[0]}
        max={duration}
        min={0}
        step={1}
        className="w-[500px] rounded-xl"
        onValueChange={handleSliderChange}
      />
      <span className="opacity-50">{duration ? formatTime(duration) : null}</span>
    </div>
  );
};

const Player = () => {
  const { isPlaying, setIsPlaying, currentMusic } = usePlayerStore(
    (state) => state
  );

  const audioRef = useRef();
  const prevVolumeRef = useRef(50);

  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleVolumeChange = (value) => {
    const [newVolume] = value;
    const volumeValue = newVolume / 100;
    setVolume(volumeValue);
    prevVolumeRef.current = newVolume;
    audioRef.current.volume = volumeValue;
  };

  const isVolumeSilence = volume === 0;

  const handleVolumeSilence = () => {
    if (isVolumeSilence) {
      setVolume(prevVolumeRef.current);
    } else {
      prevVolumeRef.current = volume;
      setVolume(0);
    }
  };

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full z-50">
      <div className="w-[200px]">
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center items-center flex-col">
          <button
            className="bg-white rounded-full p-2 w-8"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef} />
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <button onClick={handleVolumeSilence}>
          {isVolumeSilence ? <VolumeSilenceIcon /> : <VolumeIcon />}
        </button>
        <div className="grid place-content-center">
          <Slider
            value={[volume * 100]}
            defaultValue={[50]}
            max={100}
            min={0}
            step={1}
            className="w-[98px] bg-zinc-500 rounded-xl"
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
