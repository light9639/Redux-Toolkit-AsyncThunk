import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

// 스토어 생성
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

// useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;
// useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;

// 스토어 내보내기
export default store;