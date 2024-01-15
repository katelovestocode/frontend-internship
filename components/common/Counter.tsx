"use client";
import React from "react";
import { increment, decrement, reset } from "../../redux/slices/counterSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Button from "./Button";

export default function Counter() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useAppSelector((state) => state.counter.value.counter);

  return (
    <>
      <h1> {counter} </h1>
      <div className="flex flex-row">
        <Button title="+" onClick={() => dispatch(increment())} />

        <Button title="reset" onClick={() => dispatch(reset())} />

        <Button title="-" onClick={() => dispatch(decrement())} />
      </div>
    </>
  );
}
