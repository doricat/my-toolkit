import { History, LocationState, createBrowserHistory } from "history";
import { createContext } from "react";
import { RootState, StoreContext } from "./stores";
import { PDMStore } from "./stores/pdm";
import { RouterStore } from "./stores/router";

export const configureStore = (history: History<LocationState>): RootState => {
    return {
        router: new RouterStore(history),
        PDM: new PDMStore()
    };
};

export const history = createBrowserHistory();
export const store = configureStore(history);
export const MyContext: StoreContext = createContext<RootState>(store);
