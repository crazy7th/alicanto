import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import * as Status from "http-status-codes";

const stagingHost = "https://alicanto.sumpahpalapa.com";

let host = stagingHost;
if (typeof window !== "undefined") {
  host = window.location
    ? window.location.origin
      ? window.location.origin
      : stagingHost
    : stagingHost;
}

const { publicRuntimeConfig } = getConfig();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Chital-Requester": host
};

const endpoints =
  publicRuntimeConfig.baseURL + publicRuntimeConfig.apiEndpoints;

/**
 * Function to request login from API
 * @param  {string} values input username and password
 * @return token access and token refresh
 */
export const doLogin = values => {
  const postHeader = {
    method: "POST",
    headers
  };
  const payload = { ...postHeader, body: JSON.stringify(values, null, 2) };
  return fetch(`${endpoints}account/login/`, payload);
};

/**
 * Function to request register from API
 * @param  {string} values input fullname, email, no handphone, password
 * @return token access and token refresh
 */
export const doRegister = values => {
  const postHeader = {
    method: "POST",
    headers
  };
  const payload = { ...postHeader, body: JSON.stringify(values, null, 2) };
  return fetch(`${endpoints}account/register/`, payload);
};

/**
 * Function to request forgot password from API
 * @param  {string} values
 * @return
 */
export const doForgot = values => {
  const postHeader = {
    method: "POST",
    headers: {
      ...headers,
      "X-Chital-Requester": host,
      "X-Chital-Callback": "/reset"
    }
  };
  const payload = { ...postHeader, body: JSON.stringify(values, null, 2) };
  return fetch(`${endpoints}password/forgot/`, payload);
};

/**
 * Function to request forgot password from API
 * @param  {string} values
 * @return
 */
export const doReset = values => {
  const postHeader = {
    method: "POST",
    headers
  };
  const payload = { ...postHeader, body: JSON.stringify(values, null, 2) };
  return fetch(`${endpoints}password/reset/confirm`, payload);
};

/**
 * Function to request refresh token from API
 * @param  {string} values token refresh
 * @return token access
 */
export const doRefresh = values => {
  const postHeader = {
    method: "POST",
    headers
  };
  const payload = { ...postHeader, body: values };
  return fetch(`${endpoints}token/refresh/`, payload);
};

/**
 * Function to request get multiprice from API
 * @param  {string} token token access
 * @return {JSON} list multiprice
 */
export const getMultipriceWithSlug = (token, slug) => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
  const payload = { ...postHeader };
  return fetch(
    `${endpoints}multiprice/${publicRuntimeConfig.partner}/product/${slug}`,
    payload
  ).then(function(response) {
    return response.json();
  });
};

/**
 * Function to request get product Type from API
 * @return {JSON} list product Type
 */
export const getProductType = () => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers
    }
  };
  const payload = { ...postHeader };
  return fetch(`${endpoints}product_type`, payload);
};

/**
 * Function to request cart detail (basket) from API
 * @param  {string} token token access
 * @return {JSON} cart detail
 */
export const getCart = token => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: "Bearer " + token
    }
  };
  const payload = { ...postHeader };
  return fetch(`${endpoints}carts/`, payload).then(function(response) {
    return response.json();
  });
};

/**
 * Function to post cart on API
 * @param  {string} token token access
 * @param  {string} urlProduct url product from multiprice
 * @param  {array} optionValue url product from multiprice
 * @return {JSON} cart detail
 */
export const postCartWithOption = (token, urlProduct, optionValue) => {
  const postHeader = {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
  const bodyValue = { url: urlProduct, quantity: 1, options: optionValue };
  const payload = { ...postHeader, body: JSON.stringify(bodyValue) };
  return fetch(`${endpoints}carts/add/`, payload).then(function(response) {
    return response.json();
  });
};

/**
 *
 * @param {string} token
 * @returns boolean
 */
export const tokenValidate = async token => {
  const postHeader = {
    method: "GET",
    headers: { ...headers }
  };
  const payload = { ...postHeader };

  const resp = await fetch(`${endpoints}password/forgot/${token}/`, payload);
  return resp.status == Status.OK;
};

/**
 * Function to get top/recomennded payment list from API
 * @param  {string} token token access
 * @return {JSON} list payment
 */
export const getTopPayment = token => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
  const payload = { ...postHeader };
  return fetch(`${endpoints}payment/options/top`, payload).then(function(
    response
  ) {
    return response.json();
  });
};

/**
 * Function to get All payment list from API
 * @param  {string} token token access
 * @return {JSON} list payment
 */
export const getAllPayment = token => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
  const payload = { ...postHeader };
  return fetch(`${endpoints}payment/options/all`, payload).then(function(
    response
  ) {
    return response.json();
  });
};

/**
 * Function to post checkout process
 * @param  {string} token token access
 * @param  {string} urlBasket url product from multiprice
 * @return {JSON} payment url and payment detail
 */
export const checkoutProcess = (token, urlBasket) => {
  const postHeader = {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
  const bodyValue = { basket: urlBasket };

  const payload = { ...postHeader, body: JSON.stringify(bodyValue) };
  return fetch(`${endpoints}checkout/process/`, payload).then(function(
    response
  ) {
    return response.json();
  });
};

/**
 * Function to get payment url
 * @param  {string} token token access
 * @param  {string} paymentUrl url payment from checkout process
 * @return {JSON}
 */
export const getPaymentProcess = (token, paymentUrl) => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };

  const payload = { ...postHeader };
  return fetch(`${publicRuntimeConfig.baseURL}${paymentUrl}`, payload).then(
    function(response) {
      return response.json();
    }
  );
};

/**
 * Function to get order detail
 * @param  {string} token token access
 * @param  {string} orderNumber order id
 * @return {JSON}
 */
export const getOrderDetail = (token, orderNumber) => {
  const postHeader = {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  };
  const payload = { ...postHeader };
  return fetch(`${endpoints}order_detail/${orderNumber}`, payload).then(
    function(response) {
      return response.json();
    }
  );
};

/**
 * Function to get blog content
 * @return {JSON}
 */
export const getBlogContent = () => {
  const postHeader = {
    method: "GET"
  };
  const payload = { ...postHeader };
  return fetch(publicRuntimeConfig.blogContentUrl, payload).then(function(
    response
  ) {
    return response.json();
  });
};

/**
 * Function to get article detail
 * @return {JSON}
 */
export const getBlogDetail = idBlog => {
  const postHeader = {
    method: "GET"
  };

  const payload = { ...postHeader };
  return fetch(publicRuntimeConfig.blogImageUrl + idBlog, payload).then(
    function(response) {
      return response.json();
    }
  );
};
