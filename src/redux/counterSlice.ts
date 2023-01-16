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
