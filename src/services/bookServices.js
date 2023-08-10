import axios from "axios";

export async function fetchPosts(page, limit) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.warn("Error fetching data:", err);
    return null;
  }
}
