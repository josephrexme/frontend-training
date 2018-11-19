(function(){
  const host = 'http://api.giphy.com/v1';
  const apiKey = 'jwSnPSGXDTp7oqP7M3e3HQvuSJQYj73G';
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const output = document.getElementById('headerInfo');
  const images = {
    img0: document.getElementById('img1'),
    img1: document.getElementById('img2'),
    img2: document.getElementById('img3'),
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    output.textContent = 'Loading...';
    axios.get(`${host}/gifs/search?q=${input.value}&api_key=${apiKey}&limit=3`)
    .then(function (response) {
      // handle success
      output.textContent = '';
      const { data: { data } } = response;
      data.forEach((gif, index) => {
        images[`img${index}`].src = gif.images.original.url;
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      output.textContent = error;
    })
  });
}());