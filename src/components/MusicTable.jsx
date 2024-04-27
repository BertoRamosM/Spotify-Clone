import CardPlayButton from "./CardPlayButton";

const Time = () => {
  <svg
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
  </svg>;

}


const MusicTable = ({ id, songs }) => {
  return (

<table class="table-auto text-left min-w-full divide-y-1 divided-gray-500/50">
  <thead class="">
    <tr class="text-gray-300 text-sm font-light">
      <th class="px-4 py-2">#</th>
      <th class="px-4 py-2"></th>
      <th class="px-4 py-2">Title</th>
      <th class="px-4 py-2">Album</th>
      <th class="px-4 py-2">{(<Time />)}</th>
    </tr>
  </thead>

  <tbody>
    {
      songs.map((song, index) => (
        <tr class="text-gray-300 text-sm font-light">
          <td class="px-4 py-2">{index + 1}</td>
          <td>
            <CardPlayButton
              id={id}
              className={"card-play-button rounded-full bg-green-500 p-2"}
              client:visible
            />
          </td>
          <td class="px-4 py-2 flex gap-3">
            <picture class="">
              <img
                src={song.image}
                alt={song.title}
                class="2-10 h-10 rounded-md"
              />
            </picture>
            <div class="flex flex-col">
              <h3>{song.title}</h3>
              <span>{song.artists.join(", ")}</span>
            </div>
          </td>
          <td class="px-4 py-2">{song.album}</td>
          <td class="px-4 py-2">{song.duration}</td>
        </tr>
      ))
    }
  </tbody>
</table>
  )
}

export default MusicTable



