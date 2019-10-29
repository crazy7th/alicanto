import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { observable, flow, configure } from "mobx";
import { getProductType, getBlogContent, getBlogDetail } from "../api";
import * as status from "http-status-codes";
// import getConfig from "next/config";

configure({ enforceActions: "observed" });

// const { publicRuntimeConfig } = getConfig();

class Store extends BaseStore {
  product = observable.map();
  productType = "";

  /**
   * Function to get product type from API
   * @return JSON list product type
   */
  showProductType = flow(function*(token) {
    const reqProductType = yield getProductType(token);
    const productTypeText = yield reqProductType.text();
    if (reqProductType.status === status.OK) {
      const convertJSON = JSON.parse(productTypeText);
      this.productType = convertJSON.data;
      return convertJSON.data;
    }
  }).bind(this);

  /**
   * Function to get blog data
   * @return {JSON} list blog content
   */
  showBlogContent = flow(function*(token) {
    const reqGetBlogContent = yield getBlogContent();
    return reqGetBlogContent;
  }).bind(this);

  /**
   * Function to get blog detail
   * @return {JSON} array blog detail
   */
  showBlogDetail = flow(function*(idContent) {
    const reqGetBlogDetail = yield getBlogDetail(idContent);
    return reqGetBlogDetail;
  }).bind(this);
}

// Make sure the store’s unique name
// AND getCounterStore, counterStore must be same formula
// Example: getProductStore => productStore

export const getProductStore = getOrCreateStore("productStore", Store);
