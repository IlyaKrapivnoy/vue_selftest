import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
const HEADERS = { Accept: "application/json" };

export async function fetchPosts({ pageNumber, pageSize }) {
  const URL = `${BASE_URL}?_page=${pageNumber}&_limit=${pageSize}`;

  try {
    const response = await axios.get(URL, {
      responseType: "json",
      headers: HEADERS,
    });
    return response;
  } catch (err) {
    console.warn("Error fetching data:", err);
    return null;
  }
}
