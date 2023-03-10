# ๐งช Redux-Toolkit์ AsyncThunk๋ฅผ ์ด์ฉํ ์ซ์ ์ฆ๊ฐ ์์ ์๋๋ค.
:octocat: https://light9639.github.io/Redux-Toolkit-AsyncThunk/

![light9639 github io_Redux-Toolkit-AsyncThunk_](https://user-images.githubusercontent.com/95972251/212830875-5329cfa2-65d8-4247-a9a7-bfcc35554f05.png)

:sparkles: Redux-Toolkit์ AsyncThunk๋ฅผ ์ด์ฉํ ์ซ์ ์ฆ๊ฐ ์์ ์๋๋ค. :sparkles:
## :tada: React ์์ฑ
- React ์์ฑ
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite๋ฅผ ์ด์ฉํ์ฌ ํ๋ก์ ํธ๋ฅผ ์์ฑํ๋ ค๋ฉด
```bash
npm create vite@latest
# or
yarn create vite
```
- ํฐ๋ฏธ๋์์ ์คํ ํ ํ๋ก์ ํธ ์ด๋ฆ ๋ง๋  ํ React ์ ํ, Typescirpt ์ ํํ๋ฉด ์์ฑ ์๋ฃ.
## :rocket: Redux-Toolkit ์ค์น
- Redux-Toolkit ์ค์น ๋ช๋ น์ด
```bash
npm install redux react-redux @reduxjs/toolkit
# or
yarn add redux react-redux @reduxjs/toolkit
```

## โ๏ธ main.tsx, App.tsx ์์  ๋ฐ ์์ฑ
### :zap: main.tsx
- `react-redux`์์ `Provider` ํจ์ ๊ฐ์ ธ์จ ํ `store` ํ์ผ์ `import` ํ ํ์ `<Provider store={store}></Provider>`์ผ๋ก `<App />`์ ๋๋ฌ์ธ๋ฉด `Redux-Toolkit` ์ฌ์ฉ์ค๋น ์๋ฃ.
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

### :zap: App.tsx
- `Counter` ์ปดํฌ๋ํธ๋ฅผ `import` ํ ํ ์ฌ์ฉํ๋ค.
```js
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
```

## โ๏ธ counterSlice.ts, store.ts, useTypedSelector.ts, Counter.tsx ์์  ๋ฐ ์์ฑ
### :zap: counterSlice.ts
- `createAsyncThunk`๋ฅผ `fetch` ์๋ฐ์คํฌ๋ฆฝํธ ํจ์๋ฅผ ์ฌ์ฉํ์ฌ `data`๊ฐ์ `return` ์ํจ๋ค.
```js
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ๋ฐ์ดํฐ ๊ฐ์ ธ์ค๊ธฐ
export const asyncUpFetch = createAsyncThunk(
    'counterSlice/asyncUpFetch',
    async () => {
        const resp = await fetch('https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits')
        const data = await resp.json();
        return data.value;
    }
)

// ์ด๊ธฐ ๊ฐ์ ํ์ ์ ์
interface initialType {
    value: number;
    status: string;
}

// ์ด๊ธฐ ๊ฐ ์ ์ธ
const initialState: initialType = {
    value: 0,
    status: 'Welcome'
}

// slice ์์ฑ
const counterSlice = createSlice({
    // slice ์ด๋ฆ ์ ์
    name: 'counterSlice',
    // ์ด๊ธฐ ๊ฐ
    initialState,
    // ๋ฆฌ๋์
    reducers: {
        up: (state, action: PayloadAction<number>) => {
            state.value = state.value + action.payload;
        },
        set: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    },
    // ๋น๋๊ธฐ ํต์  ์ก์์ ๋ํ reducer
    extraReducers: (builder) => {
        // ํต์  ์ค
        builder.addCase(asyncUpFetch.pending, (state, action) => {
            state.status = 'Loading';
        })
        // ํต์  ์ฑ๊ณต
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = 'complete';
        })
        // ํต์  ์๋ฌ
        builder.addCase(asyncUpFetch.rejected, (state, action) => {
            state.status = 'fail';
        })
    }
});

// slice ๋ด๋ณด๋ด๊ธฐ ์ฌ๊ธฐ์๋ reducer๊ฐ ์๊ธฐ ๋๋ฌธ์ counterSlice๋ก ๋ด๋ณด๋ธ๋ค
export default counterSlice;

// ํจ์ ๋ด๋ณด๋ด๊ธฐ
export const { up, set } = counterSlice.actions;
```

### :zap: store.ts
- `RootState`๋ `useSelector` ์ฌ์ฉ์ ํ์์ผ๋ก ์ฌ์ฉํ๊ธฐ ์ํด์ ์์ฑ.
- `AppDispatch`๋ `useDispatch`๋ฅผ ์ข ๋ ๋ชํํ๊ฒ ์ฌ์ฉํ๊ธฐ ์ํด์ ์์ฑ.
```js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

// ์คํ ์ด ์์ฑ
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ์คํ ์ด ๋ด๋ณด๋ด๊ธฐ
export default store;
```

### :zap: useTypedSelector.ts
- `useDispatch`์ `useSelector`์ `typed versions`๋ฅผ ๋ง๋๋ ๊ฒ์ด ์ฌ์ฉํ๋๋ฐ ๋ ์ข๋ค.
- `useSelector`์์ `state` ์ธ์์ `RootState`๋ฅผ `import`ํด์ ํ์์ผ๋ก ๋ฃ์ด์คฌ์๋๋ฐ, ์ด๊ฑธ ๋ฐ๋ณตํ๋ ๊ฒ์์ ๋ฒ์ด๋  ์ ์๋ค.
- `useDispatch`์์ ๊ธฐ๋ณธ์ ์ธ `Dispatch` ํ์์ `thunks`์ ๋ํ์ฌ ์์ง ๋ชปํ๊ธฐ์ `thunk middleware` ํ์์ ํฌํจํ๊ณ  ์๋ `AppDispatch`๋ผ๋ ์ปค์คํ ํ์์ `useDispatch`์ ์ฌ์ฉํ  ํ์๊ฐ ์๋ค. ๋ฐ๋ผ์ ์ฌ์ ์ `useDispatch`์ `AppDispatch`๋ฅผ ์ ์ฉ์์ผ๋์ผ๋ฉด ์ฌ์ฉํ  ๋๋ง๋ค `AppDispatch`๋ฅผ `import`ํ์ง ์์๋ ๋๋ค.
```js
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### :zap: Counter.tsx
- `useTypedSelector.ts`์์ `useAppDispatch`, `useAppSelector`๋ฅผ `import` ํ ํ ์ฌ์ฉํ๋ฉด ๋๋ค.
- `counterSlice`์์ `asyncUpFetch`, `up`, `set` ํจ์ `import` ํ ์ฌ์ฉ.
```js
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { asyncUpFetch, up, set } from '../redux/counterSlice';

export default function Counter(): JSX.Element {
    const dispatch = useAppDispatch();

    const count = useAppSelector((state) => {
        return state.counter.value;
    });

    const status = useAppSelector((state) => {
        return state.counter.status;
    });

    return (
        <div>
            <button onClick={() => {
                dispatch(up(2));
            }}>+2</button>

            <button onClick={() => {
                dispatch(set(0));
            }}>Reset</button>

            {/* ๋งํฌ๋ฅผ ์กฐํํ  ๋๋ง๋ค ์ซ์๊ฐ ํ๋์ฉ ๋์ด๋์, ์ซ์๊ฐ 1์ฉ ๋์ด๋จ */}
            <button onClick={() => {
                dispatch(asyncUpFetch());
            }}>+ async fetch</button>
            
            <br />

            <div className='status'>{count} | {status}</div>
        </div>
    )
}
```

## ๐ ์ถ์ฒ
- ์ถ์ฒ 1 : <a href="https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk">Redux-Toolkit ํํ์ด์ง</a>
- ์ถ์ฒ 2 : <a href="https://velog.io/@rkio/Typescript-React-Redux-toolkitft.-axios-%EB%93%B1%EB%93%B1-%ED%99%9C%EC%9A%A9">Velog ๊ธ</a>
