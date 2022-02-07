import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../sass/pages/_movies.scss";

export default function Characters() {
  const [movieList, setMovieList] = useState();

  useEffect(async () => {
    const data = await fetch(
      `https://imdb-api.com/API/AdvancedSearch/k_hwphbmme/?producer=marvel`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();

    setMovieList(res);
  }, []);

  return (
    <div className="page">
      <h1 className="page__header">TEST</h1>
      <ul className="movies">{movieList ? console.log(movieList) : null}</ul>
    </div>
  );
}
