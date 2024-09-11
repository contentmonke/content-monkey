import './App.css';
import './custom.scss';

import { useState } from 'react'
import cmLogo from '/monkey.svg'
import ExampleList from './example/ExampleList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://purdue.edu" target="_blank">
          <img src={cmLogo} className="logo" alt="CM logo" />
        </a>
      </div>
      <h1>Content Monkey</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className="card">
        <ExampleList />
      </div>
    </>
  )
}

export default App
