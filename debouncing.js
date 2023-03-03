import React, { useState } from "react";
import axios from "axios";

const DebounceExample = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        searchAPI(searchText);
      }, 1000)
    );
  };

  const searchAPI = async (searchText) => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/users?q=${searchText}"
    );
    setSearchResults(result.data);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebounceExample;
