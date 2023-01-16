import React from './assets/react.svg'
import Counter from "./components/Counter";
import './App.css'

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={React} className="logo react" alt="React logo" />
        </a>
        <a href="https://ko.redux.js.org/introduction/getting-started/" target="_blank">
          <img src="https://camo.githubusercontent.com/7b7f04b16cc2d2d4a32985710e4d640985337a32bbb1e60cdacede2c8a4ae57b/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f72656475782e737667" className="logo" alt="Redux logo" />
        </a>
      </div>
      <h1>React + Redux</h1>

      <Counter></Counter>

      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p className="read-the-docs">
          Click on the React and Redux logos to learn more
        </p>
      </div>
    </div>
  )
}
