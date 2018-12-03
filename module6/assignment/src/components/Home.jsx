import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../styles/app.css';
import MoonGif from '../img/moon.gif';

const host = 'http://api.giphy.com/v1';
const apiKey = 'jwSnPSGXDTp7oqP7M3e3HQvuSJQYj73G';
const readyMap = state => (({
  initial: '',
  loading: 'Loading...',
  loaded: '',
  error: 'An error occured'
})[state]);

class Home  extends Component  {
  constructor() {
    super();
    this.state = {
      image1: 'http://placehold.it/200',
      image2: 'http://placehold.it/200',
      image3: 'http://placehold.it/200',
      ready: 'initial',
      input: '',
    }
    this.addInput = this.addInput.bind(this);
    this.fetchGifs = this.fetchGifs.bind(this);
  }
  addInput(event) {
    this.setState({
      input: event.target.value,
    })
  }
  fetchGifs(event) {
    event.preventDefault();
    const { input } = this.state;
    this.setState({
      loading: 'loading',
      input: ''
    });
    axios.get(`${host}/gifs/search?q=${input}&api_key=${apiKey}&limit=3`)
    .then(response => {
      const { data: { data } } = response;
      console.log(data);
      this.setState({
        ready: 'loaded',
        image1: data[0].images.original.url,
        image2: data[1].images.original.url,
        image3: data[2].images.original.url,
      })
    })
    .catch(err => {
      this.setState({
        ready: 'error'
      })
    })
  }
  render() {
    const {
      image1,
      image2,
      image3,
      ready,
    } = this.state;
    return (
      <Fragment>
        <header className="header">
          <img src={MoonGif} alt="Moon Gif" class="moon" />
          <h1>Gif Searcher</h1>
          <p>Search for gif images across the globe</p>
          <form action="" onSubmit={this.fetchGifs}>
            <label htmlFor="search" className="header__label">
              <input onChange={this.addInput} type="search" placeholder="Search for anything" className="header__search" />
              <button className="header__btn">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414"><path d="M2.3 20.3L6 16.6c-1.2-1.5-2-3.5-2-5.6 0-5 4-9 9-9s9 4 9 9-4 9-9 9c-2.1 0-4.1-.7-5.6-2l-3.7 3.7c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4zM20 11c0-3.9-3.1-7-7-7s-7 3.1-7 7c0 1.9.8 3.7 2 4.9 1.3 1.3 3 2 4.9 2 4 .1 7.1-3 7.1-6.9z" fillRule="nonzero"/></svg>
              </button>
            </label>
          </form>
          <div className="header__info">
          {readyMap(ready)}
          </div>
        </header>
        <main className="container">
          <div className="grid">
            <div className="col">
              <img src={image1} alt="Image 1" id="img1" />
            </div>
            <div className="col">
              <img src={image2} alt="Image 2" id="img1" />
            </div>
            <div className="col">
              <img src={image3} alt="Image 3" id="img1" />
            </div>
          </div>
        </main>
        <footer className="footer">
          Copyright &copy; SGA 2018. Images by <a href="https://giphy.com">Giphy</a>
        </footer>
      </Fragment>
    );
  }
}

export default Home;
