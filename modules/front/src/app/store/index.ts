import RootStore from "./RootStore";
import {initializeApp} from "@cuba-platform/rest";
import {CUBA_APP_URL} from "../../config";
import {getMainStore} from "@cuba-platform/react";
import {History, Location} from "history";


export const cubaREST = initializeApp({
  name: "kzm",
  apiUrl: CUBA_APP_URL,
  storage: window.localStorage,
  // restClientId: 'tsadv-XHTr0e8J',
  // restClientSecret: "0d2d8d1f1402d357f27aaf63cd5411224ea8e3c3a326172270de6e249ce6c54c"
  restClientId: 'tsadv-XHTr0e8J',
  restClientSecret: "0d2d8d1f1402d357f27aaf63cd5411224ea8e3c3a326172270de6e249ce6c54c"
});

export type RootStoreProp = {
  rootStore?: RootStore,
}

export interface RouteComponentProps<P> {
  match?: match<P>;
  location?: Location;
  history?: History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

export interface MatchParams {
  id: string
}

export const rootStore = new RootStore(cubaREST);