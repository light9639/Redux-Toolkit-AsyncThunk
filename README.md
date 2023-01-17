# :zap: Redux-Toolkit의 AsyncThunk를 이용한 숫자 증가 예제입니다.
:octocat: https://light9639.github.io/Redux-Toolkit-AsyncThunk/

![light9639 github io_Redux-Toolkit-AsyncThunk_](https://user-images.githubusercontent.com/95972251/212830875-5329cfa2-65d8-4247-a9a7-bfcc35554f05.png)

:sparkles: Redux-Toolkit의 AsyncThunk를 이용한 숫자 증가 예제입니다. :sparkles:
## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🚝 Redux-Toolkit 설치
- Redux-Toolkit 설치 명령어
```bash
npm install redux react-redux @reduxjs/toolkit
# or
yarn add redux react-redux @reduxjs/toolkit
```

## ✒️ App.tsx, counterSlice.ts, store.ts, useTypedSelector.ts, Counter.tsx 수정 및작성
### :zap: App.tsx
- Counter 컴포넌트를 import 후 사용.
```bash 
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

### :zap: counterSlice.ts
- createAsyncThunk를 fetch 자바스크립트 함수를 사용하여 data값을 return.
```bash 
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// 데이터 가져오기
export const asyncUpFetch = createAsyncThunk(
    'counterSlice/asyncUpFetch',
    async () => {
        const resp = await fetch('https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits')
        const data = await resp.json();
        return data.value;
    }
)

// 초기 값의 타입 정의
interface initialType {
    value: number;
    status: string;
}

// 초기 값 선언
const initialState: initialType = {
    value: 0,
    status: 'Welcome'
}

// slice 생성
const counterSlice = createSlice({
    // slice 이름 정의
    name: 'counterSlice',
    // 초기 값
    initialState,
    // 리듀서
    reducers: {
        up: (state, action: PayloadAction<number>) => {
            state.value = state.value + action.payload;
        },
        set: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    },
    // 비동기 통신 액션에 대한 reducer
    extraReducers: (builder) => {
        // 통신 중
        builder.addCase(asyncUpFetch.pending, (state, action) => {
            state.status = 'Loading';
        })
        // 통신 성공
        builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = 'complete';
        })
        // 통신 에러
        builder.addCase(asyncUpFetch.rejected, (state, action) => {
            state.status = 'fail';
        })
    }
});

// slice 내보내기 여기서는 reducer가 없기 때문에 counterSlice로 내보낸다
export default counterSlice;

// 함수 내보내기
export const { up, set } = counterSlice.actions;
```

### :zap: store.ts
- RootState는 useSelector 사용시 타입으로 사용하기 위해서 생성.
- AppDispatch는 useDispatch를 좀 더 명확하게 사용하기 위해서 생성.
```bash 
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

// 스토어 생성
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 스토어 내보내기
export default store;
```

### :zap: useTypedSelector.ts
- useDispatch와 useSelector의 typed versions를 만드는 것이 사용하는데 더 좋다.
- useSelector에서 state 인자에 RootState를 import해서 타입으로 넣어줬었는데, 이걸 반복하는 것에서 벗어날 수 있다.
- useDispatch에서 기본적인 Dispatch 타입은 thunks에 대하여 알지 못하기에 thunk middleware 타입을 포함하고 있는 AppDispatch라는 커스텀 타입을 useDispatch에 사용할 필요가 있다. 따라서 사전에 useDispatch에 AppDispatch를 적용시켜놓으면 사용할 때마다 AppDispatch를 import하지 않아도 된다.
```bash 
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### :zap: Counter.tsx
- useTypedSelector.ts에서 useAppDispatch, useAppSelector import 후 사용.
- counterSlice에서 asyncUpFetch, up, set 함수 import 후 사용.
```bash 
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

            {/* 링크를 조회할 때마다 숫자가 하나씩 늘어나서, 숫자가 1씩 늘어남 */}
            <button onClick={() => {
                dispatch(asyncUpFetch());
            }}>+ async fetch</button>
            
            <br />

            <div className='status'>{count} | {status}</div>
        </div>
    )
}
```

## 📎 출처
- 출처 1 : <a href="https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk">Redux-Toolkit 홈페이지</a>
- 출처 2 : <a href="https://velog.io/@rkio/Typescript-React-Redux-toolkitft.-axios-%EB%93%B1%EB%93%B1-%ED%99%9C%EC%9A%A9">Velog 글</a>