import axios from "axios";

function get(q) {
  return axios({
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: {
        "q": q
    },
    headers: {
        "x-rapidapi-key": "5696c072a9mshfa3f1127e1360d2p1684cajsn3100f417c5ca",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "useQueryString": true
    }
  });
}

export default { get };
