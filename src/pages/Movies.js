import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../sass/pages/_movies.scss";

export default function Movies() {
  const [movieList, setMovieList] = useState();

  useEffect(async () => {
    const data = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();

    setMovieList(res.data);
  }, []);

  return (
    <div className="page">
      <h1 className="page__header">Movies</h1>
      <ul className="movies">
        {movieList
          ? movieList.map((movie, i) => {
              return (
                <li key={i + movie.imdb_id} className="movies__box">
                  <Link to={"/movies/" + movie.id} className="movies__link">
                    <img
                      src={movie.cover_url}
                      alt="Cover"
                      className="movies__img"
                    />
                    <div className="movies__info">
                      <h3 className="movies__title">{movie.title}</h3>
                    </div>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
