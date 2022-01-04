import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import '../sass/pages/_movieDetails.scss';
import '../sass/pages/_movies.scss';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [paginationPage, setPaginationPage] = useState(0);
  const [resultPerPage, setResultPerPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  let startPagination = paginationPage * resultPerPage;
  let endPagination = startPagination + resultPerPage;

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth <= 1300 ? window.innerWidth : 1300;

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
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!movie) return;

    const maxPages = Math.ceil(movie.related_movies.length / resultPerPage);

    setMaxPages(maxPages);
    setPaginationPage(0);
    startPagination = paginationPage * resultPerPage;
    endPagination = startPagination + resultPerPage;
  }, [movie, resultPerPage]);

  const changePage = ({ selected }) => {
    setPaginationPage(selected);
  };

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
            {maxPages !== 1 ? (
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={maxPages}
                onPageChange={changePage}
                forcePage={paginationPage}
                containerClassName={'movie__related--pagination'}
                previousLinkClassName={'paginationBtn paginationBtn__back'}
                nextLinkClassName={'paginationBtn paginationBtn__forward'}
                activeLinkClassName={'activePagination'}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
