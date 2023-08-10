import axios from "axios";

export async function fetchPosts(page, limit) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
      { responseType: "json", headers: { Accept: "application/json" } }
    );

    return response;
  } catch (err) {
    console.warn("Error fetching data:", err);
    return null;
  }
}
