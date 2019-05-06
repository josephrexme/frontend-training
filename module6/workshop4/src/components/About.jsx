import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  background: #fafafa;
  padding: 40px;
  text-align: center;
`;

const Article = styled.article`
  min-height: 400px;
  width: 90%;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
`;

function About() {
  return(
    <Container>
      <h1>About Us</h1>
      <h5><Link to="/">Go back home</Link></h5>
      <Article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, rerum?</p>
      </Article>
    </Container>
  );
}

export default About;
