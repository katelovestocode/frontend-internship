import { IntitalState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IntitalState = {
    value: {
        counter: 0
    }
}
export const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            return {
                value: {
                counter: state.value.counter + 1
            }}
        },
         decrement: (state) => {
            return {
                value: {
                counter: state.value.counter - 1
                 }
             }  },
        reset: () => {
            return initialState
                
        }
    }
})

export const { increment, decrement, reset } = counter.actions;
export default counter.reducer;