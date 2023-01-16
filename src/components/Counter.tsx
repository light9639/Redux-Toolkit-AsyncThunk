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