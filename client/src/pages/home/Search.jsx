import React, { useState } from "react";

const Search = ({ getCourseByAuthor }) => {
  const [authorName, setAuthorName] = useState("");
  console.log(authorName.length, "authorname");

  const searchByAuthor = () => {
    const modifiedString = authorName
      ?.split(",")
      .map((d) => d.trim())
      .join(",");
    getCourseByAuthor(modifiedString);
  };
  return (
    <div className="mt-5 flex justify-center">
      <input
        type="text"
        className="w-1/2 h-7 rounded-md p-4 focus:border-blue-300 active:border-blue-300 focus-visible:border-blue-300 ring-1"
        placeholder="Search By author(s)"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />
      <button
        className="p-1 bg-green-400 h-8 rounded-lg mx-2 text-white"
        onClick={searchByAuthor}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
