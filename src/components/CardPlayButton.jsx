import { Pause, Play } from "./Player"
import { usePlayerStore } from "../store/playerStore"


const CardPlayButton = ({ id }) => {
  const { currentSong, isPlaying, setIsPlaying, setCurrentSong } = usePlayerStore(state => state)
  
  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }
  return (
    <button className="card-play-button rounded-full bg-green-500 p-3"
    onClick={handleClick}>
      {isPlaying ? <Pause/> : <Play/>}
    </button>
  )
}

export default CardPlayButton