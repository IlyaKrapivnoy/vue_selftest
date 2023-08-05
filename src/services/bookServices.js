import axios from "axios";

export async function fetchBooks(page, limit) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=programming&startIndex=${
        (page - 1) * limit
      }&maxResults=${limit}`
    );
    console.log(response.data.items);

    return response.data;
  } catch (err) {
    console.warn("Error fetching data:", err);
    return null;
  }
}
