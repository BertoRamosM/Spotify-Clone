import { allPlaylists, songs as allSongs } from "../../lib/data";

export async function GET({ params, request }) {
  //get the id from the url search params
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')

  //we get the playlist and the songs
  const playlist = allPlaylists.find((playlist) => playlist.id === id)
  const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  })




  //another way of doing it if we dont have the completed url
 /*  const queryString = url.split("?")[1]
  const query = new URLSearchParams(queryString)
  query.get('id') */
}