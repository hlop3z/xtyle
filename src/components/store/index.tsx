//@ts-nocheck
import dict from "./core/dict.ts";
import { list, set } from "./core/list.ts";
// import model from "./core/model.ts";
import "./model.ts";

/**
 * Import statements for signals and hooks from preact library
 */
const { signal } = preact;

/**
 * Signal for window size
 */
export const device: any = signal({
  x: window.innerWidth,
  y: window.innerHeight,
});

// Window resize event listener
window.addEventListener("resize", () => {
  device.value = {
    x: window.innerWidth,
    y: window.innerHeight,
  };
});

// Dict
export const useSignalX: any = (inObj: any) => dict("useSignal", inObj);
export const signalX: any = (inObj: any) => dict("signal", inObj);

// List
export const useListX: any = (inObj: any) => list("useSignal", inObj);
export const listX: any = (inObj: any) => list("signal", inObj);

// Set
export const useSetX: any = (inObj: any) => set("useSignal", inObj);
export const setX: any = (inObj: any) => set("signal", inObj);

// Models (Dict + List)
export { default as models } from "./model.ts";

export default {};
