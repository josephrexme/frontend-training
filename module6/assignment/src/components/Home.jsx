import React, { Component, Fragment } from 'react';

class Home  extends Component  {
  render() {
    return (
      <Fragment>
        <header>
          <h1>Gif Searcher</h1>
          <p>Search for gif images across the globe</p>
          <form action="">
            <label htmlFor="search">
              <input type="search" placeholder="Search for anything" />
              <button>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M2.3 20.3L6 16.6c-1.2-1.5-2-3.5-2-5.6 0-5 4-9 9-9s9 4 9 9-4 9-9 9c-2.1 0-4.1-.7-5.6-2l-3.7 3.7c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4zM20 11c0-3.9-3.1-7-7-7s-7 3.1-7 7c0 1.9.8 3.7 2 4.9 1.3 1.3 3 2 4.9 2 4 .1 7.1-3 7.1-6.9z" fill-rule="nonzero"/></svg>
              </button>
            </label>
          </form>
          <div></div>
        </header>
        <main>
          <div className="grid"></div>
        </main>
        <footer>
          Copyright &copy; SGA 2018. Images by <a href="https://giphy.com">Giphy</a>
        </footer>
      </Fragment>
    );
  }
}

export default Home;
