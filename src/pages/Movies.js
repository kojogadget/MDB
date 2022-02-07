import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../sass/pages/_movies.scss';

export default function Movies() {
  const [movieList, setMovieList] = useState();
  const [paginationPage, setPaginationPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  const resultPerPage = 6;
  let start = paginationPage * resultPerPage;
  let end = start + resultPerPage;

  useEffect(async () => {
    const data = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await data.json();

    setMovieList(res.data);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!movieList) return;

    const maxPages = Math.ceil(movieList.length / resultPerPage);

    setMaxPages(maxPages);
    setPaginationPage(0);
    start = paginationPage * resultPerPage;
    end = start + resultPerPage;
  }, [movieList, resultPerPage]);

  const changePage = ({ selected }) => {
    setPaginationPage(selected);
  };

  return (
    <div className='page'>
      <h1 className='page__header'>{movieList ? 'Movies' : 'Loading...'}</h1>
      <ul className='movies'>
        {movieList
          ? movieList.slice(start, end).map((movie, i) => {
              return (
                <li key={i + movie.imdb_id} className='movies__box'>
                  <Link to={'/movies/' + movie.id} className='movies__link'>
                    <img
                      src={movie.cover_url}
                      alt='Cover'
                      className='movies__img'
                    />
                    <div className='movies__info'>
                      <h3 className='movies__title'>{movie.title}</h3>
                    </div>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={maxPages}
        onPageChange={changePage}
        forcePage={paginationPage}
        containerClassName={'movies__pagination'}
        previousLinkClassName={'paginationBtn paginationBtn__back'}
        nextLinkClassName={'paginationBtn paginationBtn__forward'}
        activeLinkClassName={'activePagination'}
      />
    </div>
  );
}
