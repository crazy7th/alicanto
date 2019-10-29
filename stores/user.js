import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, flow, configure, remove } from "mobx";
import * as Status from "http-status-codes";
import cookie from "react-cookies";
import Router from "next/router";
import { doLogin, doRegister, doForgot, doReset, doRefresh } from "../api";

configure({ enforceActions: "observed" });
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

class Store extends BaseStore {
  token = observable({
    access: "",
    refresh: ""
  });

  product = observable({});

  // authenticate token
  authenticate = flow(function*(values) {
    const promise = yield doLogin(values);
    const body = yield promise.text();

    // if OK, set data to userRegistry map
    if (promise.status === Status.OK) {
      this.token = JSON.parse(body).data;
      document.cookie = `token=${this.token.access}; path=/`;
      document.cookie = `tknRefresh=${this.token.refresh}; path=/`;
    }
    return promise.status;
  }).bind(this);

  authenticate2 = flow(function*(values) {
    const promise = yield doRegister(values);
    const body = yield promise.text();

    if (promise.status === Status.CREATED) {
      this.token = JSON.parse(body).data;
      document.cookie = `token=${this.token.access}; path=/`;
      document.cookie = `tknRefresh=${this.token.refresh}; path=/`;
    }
    return promise.status;
  }).bind(this);

  ForgotPassword = flow(function*(values) {
    const forgot = yield doForgot(values);
    const bodyForgot = yield forgot.text();

    if (forgot.status === Status.OK) {
      this.token = JSON.parse(bodyForgot).data;
      document.cookie = `token=${this.token.access}; path=/`;
    }
    return forgot.status;
  }).bind(this);

  ResetPassword = flow(function*(values) {
    const reset = yield doReset(values);
    const bodyReset = yield reset.text();

    if (reset.status === Status.OK) {
      this.token = JSON.parse(bodyReset).data;
      document.cookie = `token=${this.token.access}; path=/`;
    }
    return reset.status;
  }).bind(this);

  logout = flow(function*(values) {
    cookie.remove("tknRefresh", { path: "/" });
    cookie.remove("token", { path: "/" });
    localStorage.clear();
    Router.push("/");
  }).bind(this);

  // get access token by email
  getAccess = email => "test";

  // get refresh token by email
  getRefresh = email => "tust";

  /**
   * Function to get spesific data on cookies
   * @param {string }input cookies name
   * @return {string} data on specific cookies name
   */
  getCookie = flow(function*(input) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp("" + input + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(
      !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
    );
  });

  /**
   * Function to do refresh authorization
   * @return none
   */
  refreshAuth = flow(function*(values) {
    let tokenOnCookie = "";
    yield this.getCookie("tknRefresh").then(function(result) {
      tokenOnCookie = result;
    });
    const token = this.token.refresh ? this.token.refresh : tokenOnCookie;
    const refreshToken = `{"refresh":"${token}"}`;
    const doRefreshAuth = yield doRefresh(refreshToken);
    const responseRefresh = yield doRefreshAuth.text();
    if (doRefreshAuth.status === Status.OK) {
      this.token.access = yield JSON.parse(responseRefresh).data.access;
      document.cookie = `token=${this.token.access}; path=/`;
    }
  }).bind(this);
}

// Make sure the store’s unique name
// AND getCounterStore, counterStore must be same formula
// Example: getUserStore => userStore
// Example: getProductStore => productStore
export const getUserStore = getOrCreateStore("userStore", Store);
