import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
} from "preact/hooks";
import {
  signal,
  computed,
  effect,
  batch,
  useSignalEffect,
  useSignal,
  useComputed,
} from "@preact/signals";

// Create a signal for component readiness
export const $ready = signal(false);

// Export preact core
export { h, render } from "preact";

// Export preact hooks
export { useState, useEffect, useRef, useCallback, useMemo, useReducer };

// Export preact signals
export {
  signal,
  computed,
  effect,
  batch,
  useSignalEffect,
  useSignal,
  useComputed,
};

// Wait for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  $ready.value = true;
});
