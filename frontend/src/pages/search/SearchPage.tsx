import React, { useState } from "react";
import { Loading, SmallLoading } from "../../components/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { MediaType, VolumeInfo } from "../../models/Models";
import { loadSearchResults } from "./search-utils";


function SearchPage() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState<VolumeInfo[]>([]);
  const [isLoading, setIsLoading] = useState("");


  async function fetchData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loadSearchResults(MediaType.BOOK, title, setResults, setIsLoading)
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
      {isLoading && <SmallLoading />}

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

export default withAuthenticationRequired(SearchPage, {
  onRedirecting: () => <Loading />,
});
