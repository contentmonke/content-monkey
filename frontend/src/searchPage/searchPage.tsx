import React, { useState } from "react";
import axios from "axios";

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  thumbnail: string;
  pageCount: string;
}


function BookSearch() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState<VolumeInfo[]>([]);


  async function fetchData(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      console.log( title );
      const response = await axios.get(`http://localhost:8080/api/search`, {
        params: { bookTitle: title }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }


  return (
    <div>
      <h1>Book Search</h1>
      <form onSubmit={fetchData}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <p>{book.authors[0]}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Pages Count: {book.pageCount}</p>
            <img src={book.thumbnail} alt={book.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
