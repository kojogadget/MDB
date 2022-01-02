import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../sass/pages/_movieDetails.scss';
import '../sass/pages/_movies.scss';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// const nextPage = () => {
//   if (paginationPage === lastPage) setPaginationPage(1);
//   setPaginationPage(paginationPage + 1);
// };

// const previousPage = () => {
//   if (paginationPage === 1) setPaginationPage(lastPage);
//   setPaginationPage(paginationPage - 1);
// };

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [paginationPage, setPaginationPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  let startPagination = (paginationPage - 1) * resultPerPage;
  let endPagination = paginationPage * resultPerPage;

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth <= 1300 ? window.innerWidth : 1300;

      console.log(Math.floor(width / 180));
      setResultPerPage(Math.floor(width / 180));
    };
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(async () => {
    const data = await fetch(
      `https://mcuapi.herokuapp.com/api/v1/movies/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const res = await data.json();

    console.log(res);
    setMovie(res);
  }, [id]);

  useEffect(() => {
    if (!movie) return;
    console.log(movie.related_movies.length, resultPerPage);

    const maxPages = Math.ceil(movie.related_movies.length / resultPerPage);

    setLastPage(maxPages);
    setPaginationPage(1);
    startPagination = (paginationPage - 1) * resultPerPage;
    endPagination = paginationPage * resultPerPage;
  }, [movie, resultPerPage]);

  window.scrollTo(0, 0);

  return (
    <div className='page'>
      <h1 className='page__header'>{movie ? movie.title : 'Loading...'}</h1>
      {movie ? (
        <div className='movie'>
          <div className='movie__top-info'>
            <span className='movie__top-info--year'>
              {movie.release_date.slice(0, 4)}
            </span>
            /
            <span className='movie__top-info--duration'>
              {Math.trunc(movie.duration / 60)}h{' '}
              {movie.duration % 60 !== 0 ? (movie.duration % 60) + 'm' : ''}
            </span>
            /
            <span className='movie__top-info--directed'>
              {movie.directed_by}
            </span>
          </div>

          <div className='movie__show'>
            <div className='movie__cover'>
              <img
                src={movie.cover_url}
                alt='Cover'
                className='movie__cover--img'
              />
            </div>

            <div className='movie__trailer'>
              <iframe
                src={movie.trailer_url}
                className='movie__trailer--content'
              ></iframe>
            </div>
          </div>

          <div className='movie__general'>
            <p className='article'>{movie.overview}</p>
          </div>

          <div className='movie__related'>
            <button
              className={
                lastPage !== 1
                  ? 'paginationBtn paginationBtn__back'
                  : 'paginationBtn paginationBtn__back hidden'
              }
              onClick={() => {
                if (paginationPage === 1) {
                  setPaginationPage(lastPage);
                  startPagination = (paginationPage - 1) * resultPerPage;
                  endPagination = paginationPage * resultPerPage;
                  return;
                }

                setPaginationPage(paginationPage - 1);
                startPagination = (paginationPage - 1) * resultPerPage;
                endPagination = paginationPage * resultPerPage;
                console.log(paginationPage);
              }}
            >
              <IoIosArrowBack />
            </button>
            <button
              className={
                lastPage !== 1
                  ? 'paginationBtn paginationBtn__forward'
                  : 'paginationBtn paginationBtn__forward hidden'
              }
              onClick={() => {
                if (paginationPage === lastPage) {
                  setPaginationPage(1);
                  startPagination = (paginationPage - 1) * resultPerPage;
                  endPagination = paginationPage * resultPerPage;
                  return;
                }

                setPaginationPage(paginationPage + 1);
                startPagination = (paginationPage - 1) * resultPerPage;
                endPagination = paginationPage * resultPerPage;
                console.log(paginationPage);
              }}
            >
              <IoIosArrowForward />
            </button>
            <h3 className='movie__related--heading'>Related Movies</h3>
            <ul className='movie__related--list'>
              {movie.related_movies
                .slice(startPagination, endPagination)
                .map((m, i) => {
                  return (
                    <li key={i + m.imdb_id} className='movie__related--box'>
                      <Link
                        to={'/movies/' + m.id}
                        className='movie__related--link'
                      >
                        <img
                          src={m.cover_url}
                          alt='Cover'
                          className='movie__related--img'
                        />
                        <div className='movie__related--info'>
                          <h3 className='movie__related--title'>{m.title}</h3>
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
