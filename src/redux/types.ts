import { Action } from "redux";
import { Epic } from "redux-observable";
import { Observable } from "rxjs";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import rootReducer from "./rootReducer";
import observableFetch from "./observableFetch";

export type ObservableFetch<T> = (
  ...args: Parameters<typeof fetch>
) => Observable<T>;

export type AppState = ReturnType<typeof rootReducer>;

export type EpicDependencies = {
  observableFetch: typeof observableFetch;
};

/**
 * @typeparam A - The Action type
 */
export type TypedEpic<A extends Action> = Epic<
  A,
  A,
  AppState,
  EpicDependencies
>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
