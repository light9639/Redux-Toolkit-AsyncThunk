import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

/** useDispatch와 useSelector의 typed versions를 만드는 것이 사용하는데 더 좋다. */
/** useSelector에서 state 인자에 RootState를 import해서 타입으로 넣어줬었는데, 이걸 반복하는 것에서 벗어날 수 있다. */
export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * useDispatch에서 기본적인 Dispatch 타입은 thunks에 대하여 알지 못하기에 thunk middleware 타입을 포함하고 있는 AppDispatch라는 커스텀 타입을 useDispatch에 사용할 필요가 있다. 
 * 따라서 사전에 useDispatch에 AppDispatch를 적용시켜놓으면 사용할 때마다 AppDispatch를 import하지 않아도 된다.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
