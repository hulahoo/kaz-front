import RootStore from "./RootStore";
import {getBasicAuthHeaders, initializeApp} from "@cuba-platform/rest";
import {CUBA_APP_URL} from "../../config";


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

cubaREST.login = function (login, password, options) {
  if (login == null) {
    login = "";
  }
  if (password == null) {
    password = "";
  }
  var fetchOptions = {
    method: "POST",
    headers: getBasicAuthHeaders(this.restClientId, this.restClientSecret, this.locale),
    body: "grant_type=password&username=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password),
  };
  var endpoint = options && options.tokenEndpoint ? options.tokenEndpoint : 'v2/oauth/token';
  const {checkStatus} = (cubaREST as any);
  var loginRes = fetch(this.apiUrl + endpoint, fetchOptions)
    .then(checkStatus)
    .then(function (resp) { return resp.json(); })
    .then(function (data) {
      cubaREST.restApiToken = data.access_token;
      return data;
    });
  return loginRes;
};

export const rootStore = new RootStore(cubaREST);