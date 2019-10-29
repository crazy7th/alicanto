import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, flow, configure } from "mobx";
import * as status from "http-status-codes";
import getConfig from "next/config";
import {
  getMultipriceWithSlug,
  getCart,
  postCartWithOption,
  getTopPayment,
  getAllPayment,
  checkoutProcess,
  getPaymentProcess,
  getOrderDetail
} from "../api";
import { User } from "./user";

configure({ enforceActions: "observed" });

const { publicRuntimeConfig } = getConfig();

class Store extends BaseStore {
  // product = observable.map();
  cart = "";
  productMultiprice = "";

  /**
   * Function to listing product on API
   * @param  {string} token token access
   * @return {JSON} listing product
   */
  showMultipriceWithSlug = flow(function*(token, slug) {
    const reqMultiprice = yield getMultipriceWithSlug(token, slug);
    return reqMultiprice;
  });

  /**
   * Function to get cart detail on API
   * @param  {string} token token access
   * @return {JSON} cart detail
   */
  showCart = flow(function*(token) {
    const reqGetCart = yield getCart(token);
    return reqGetCart;
  }).bind(this);

  /**
   * Function to post cart detail on API
   * @param  {string} token token access
   * @param {string} url url product
   * @param {array} optionValue url product
   * @return {JSON} cart detail
   */
  postCartWithOption = flow(function*(token, url, optionValue) {
    const reqPostCart = yield postCartWithOption(token, url, optionValue);
    return reqPostCart;
  }).bind(this);

  /**
   * Function to get top/recommended payment list from API
   * @param  {string} token token access
   * @return {JSON} list top payment
   */
  showTopPayment = flow(function*(token) {
    const reqTopPayment = yield getTopPayment(token);
    return reqTopPayment;
  }).bind(this);

  /**
   * Function to get all payment list from API
   * @param  {string} token token access
   * @return {JSON} list all payment
   */
  showAllPayment = flow(function*(token) {
    const reqAllPayment = yield getAllPayment(token);
    return reqAllPayment;
  }).bind(this);

  /**
   * Function to make order checkout process
   * @param  {string} token token access
   * @param  {string} urlBasket url cart
   * @return {JSON} url checkout payment and payment detail
   */
  postCheckoutProcess = flow(function*(token, urlBasket) {
    const reqCheckoutProcess = yield checkoutProcess(token, urlBasket);
    return reqCheckoutProcess;
  }).bind(this);

  /**
   * Function to do processing payment
   * @param  {string} token token access
   * @param  {string} paymentUrl url payment
   * @return {JSON} redirect url
   */
  paymentProcess = flow(function*(token, paymentUrl) {
    const reqPaymentProcess = yield getPaymentProcess(token, paymentUrl);
    return reqPaymentProcess;
  }).bind(this);

  /**
   * Function to hit get order detail from API
   * @param  {string} token token access
   * @param  {string} orderNumber order id / order number
   */
  showOrderDetail = flow(function*(token, orderNumber) {
    const reqGetOrderDetail = yield getOrderDetail(token, orderNumber);
    return reqGetOrderDetail;
  }).bind(this);

  /**
   * Function to find value from attribute
   * @param  {string} data attribute from response add to cart
   * @param {string} optionName parameter to check
   * @return {string} value
   */
  checkOptions = (data, optionName) => {
    for (const i in data) {
      const { option, value } = data[i];
      if (option.code === optionName) {
        return value;
        break;
      }
    }
  };

  /**
   * Function to change format data for looping example: data inquiry, order details or payment detail
   * @param {array} response list data inquiry or payment detail or order details
   * @return {array} detail order data
   */
  setDataForLoop = response => {
    if (response !== 0) {
      const data = response;
      const dataForLoop = [];
      Object.keys(data).forEach(function(key) {
        let fieldData = {};
        fieldData.field = key;
        fieldData.value = data[key];
        dataForLoop.push(fieldData);
      });
      return dataForLoop;
    }
  };
}

// Make sure the store’s unique name
// AND getCounterStore, counterStore must be same formula
// Example: getProductStore => productStore
export const getTransactionStore = getOrCreateStore("transactionStore", Store);
