import { Pause, Play } from "./Player"
import { usePlayerStore } from "../store/playerStore"


const CardPlayButton = ({ id }) => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)
  
  const handleClick = () => {
    setCurrentMusic({
      playlists: {
        id
      }
    })
    setIsPlaying(!isPlaying)
  }

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  return (
    <button className="card-play-button rounded-full bg-green-500 p-4"
    onClick={handleClick}>
      {isPlayingPlaylist ? <Pause/> : <Play/>}
    </button>
  )
}

export default CardPlayButton