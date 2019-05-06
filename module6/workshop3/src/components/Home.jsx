import React, { useState, useRef } from 'react';

function Home() {
  const [number, setNumber] = useState(0);
  const [value, setValue] = useState('');
  const [formValue, setFormValue] = useState('');
  const entry = useRef();

  const addNumber = () => {
    setNumber(number + 1);
  };

  const processForm = (e) => {
    e.preventDefault();
    setFormValue(entry.current.value);
  };

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <header>
        <h1>This is the header</h1>
      </header>
      <main>
        <p>This is where the main content go!!</p>
        <section>
          <h3>Number Addition</h3>
          <button onClick={addNumber}>Add number</button>
          <p><strong>{number}</strong></p>
        </section>
        <section>
          <h3>Live input</h3>
          <input type="text" onChange={updateValue} />
          <p><strong>{value}</strong></p>
        </section>
        <section>
          <h3>Form submission</h3>
          <form onSubmit={processForm}>
            <input type="text" ref={entry} />
            <input type="submit" value="Submit Form" />
            <p><strong>{formValue}</strong></p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Home;
