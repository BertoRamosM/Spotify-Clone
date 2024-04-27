import { Pause, Play } from "./Player"
import { usePlayerStore } from "../store/playerStore"


const CardPlayButton = ({ id, className }) => {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)
  
  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then((data) => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })

      })
    
  }

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  return (
    <button className={className}
    onClick={handleClick}>
      {isPlayingPlaylist ? <Pause/> : <Play/>}
    </button>
  )
}

export default CardPlayButton