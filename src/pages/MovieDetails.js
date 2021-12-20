import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../sass/pages/_movieDetails.scss";
import "../sass/pages/_movies.scss";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(async () => {
    const data = await fetch(
      `https://mcuapi.herokuapp.com/api/v1/movies/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();

    console.log(res);
    setMovie(res);
  }, [id]);

  window.scrollTo(0, 0);

  return (
    <div className="page">
      <h1 className="page__header">{movie ? movie.title : "Loading..."}</h1>
      {movie ? (
        <div className="movie">
          <div className="movie__top-info">
            <span className="movie__top-info--year">
              {movie.release_date.slice(0, 4)}
            </span>
            /
            <span className="movie__top-info--duration">
              {Math.trunc(movie.duration / 60)}h{" "}
              {movie.duration % 60 !== 0 ? (movie.duration % 60) + "m" : ""}
            </span>
            /
            <span className="movie__top-info--directed">
              {movie.directed_by}
            </span>
          </div>

          <div className="movie__show">
            <div className="movie__cover">
              <img
                src={movie.cover_url}
                alt="Cover"
                className="movie__cover--img"
              />
            </div>

            <div className="movie__trailer">
              <iframe
                src={movie.trailer_url}
                className="movie__trailer--content"
              ></iframe>
            </div>
          </div>

          <div className="movie__general">
            <p className="article">{movie.overview}</p>
          </div>

          <div className="movie__related">
            <h3 className="movie__related--heading">Related Movies</h3>
            <ul className="movie__related--list">
              {movie.related_movies.map((m, i) => {
                return (
                  <li key={i + m.imdb_id} className="movie__related--box">
                    <Link
                      to={"/movies/" + m.id}
                      className="movie__related--link"
                    >
                      <img
                        src={m.cover_url}
                        alt="Cover"
                        className="movie__related--img"
                      />
                      <div className="movie__related--info">
                        <h3 className="movie__related--title">{m.title}</h3>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
