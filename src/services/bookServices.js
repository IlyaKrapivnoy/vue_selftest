import axios from "axios";

export async function fetchBooks() {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=programming"
    );
    console.log(response.data.items);
    return response.data;
  } catch (err) {
    console.warn("Error fetching data:", err);
    return null;
  }
}
