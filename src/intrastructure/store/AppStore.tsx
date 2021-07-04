import React, { ReactNode } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "./appReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWare = applyMiddleware(thunkMiddleware);
const store = createStore(appReducer, composeWithDevTools(middleWare));

export interface AppStoreProps {
    children: ReactNode | ReactNode[];
}

export function AppStore({ children }: AppStoreProps) {
    return <Provider store={store}>{children}</Provider>;
}
