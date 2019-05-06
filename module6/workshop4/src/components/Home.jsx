import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import '../app.css';

const host = 'http://api.giphy.com/v1';
const apiKey = 'jwSnPSGXDTp7oqP7M3e3HQvuSJQYj73G';
const getImages = (val) => {
  return axios.get(`${host}/gifs/search?q=${val}&api_key=${apiKey}&limit=3`);
}

function Home() {
  const input = useRef();
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages('Counterstrike')
    .then((response) => {
      const { data: { data } } = response;
      setImages(data);
    })
  }, []);

  const searchForm = (e) => {
    e.preventDefault();
    const { value } = input.current;
    getImages(value)
    .then((response) => {
      setError('');
      // response.data.data
      const { data: { data } } = response;
      setImages(data);
    })
    .catch((error) => {
      // handle error
      setError(error);
    })
  };

  return (
    <>
      <header className="header">
        <h1>Gif Searcher</h1>
        <p>Search for gif images across the globe</p>
        <form action="" onSubmit={searchForm}>
          <label htmlFor="search" className="header__label">
          <input type="search" ref={input} className="header__search" placeholder="Search for anything" />
          <button className="header__btn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" aria-label="Search"><path d="M2.3 20.3L6 16.6c-1.2-1.5-2-3.5-2-5.6 0-5 4-9 9-9s9 4 9 9-4 9-9 9c-2.1 0-4.1-.7-5.6-2l-3.7 3.7c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4zM20 11c0-3.9-3.1-7-7-7s-7 3.1-7 7c0 1.9.8 3.7 2 4.9 1.3 1.3 3 2 4.9 2 4 .1 7.1-3 7.1-6.9z" fillRule="nonzero"/></svg>
          </button>
          </label>
        </form>
        <div className="header__info">{error}</div>
      </header>
      <main className="container">
        <div className="grid">
        {
          images.map((image) => (
            <div className="col" key={image.id}><img src={image.images.original.url} alt={image.title} /></div>
          ))
        }
        </div>
      </main>
      <footer className="footer">
        Copyright &copy; SGA 2018. Images by <a href="https://giphy.com">Giphy</a> . <Link to="/about">About Us</Link>
      </footer>
    </>
  );
}

export default Home;
