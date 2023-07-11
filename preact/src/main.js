import Fragment from "./fragment";
import { createContext, h, render } from "preact";
// Signals
import {
  signal,
  computed,
  effect,
  batch,
  useSignalEffect,
  useSignal,
  useComputed,
} from "@preact/signals";
// Hooks
import {
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useErrorBoundary,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "preact/hooks";

export default {
  // Fragment (Custom)
  Fragment,

  // Preact
  createContext,
  h,
  render,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useErrorBoundary,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  // Signal
  signals: {
    signal,
    computed,
    effect,
    batch,
    useSignalEffect,
    useSignal,
    useComputed,
  },
};
