import React from "react";
import App, { Container } from "next/app";
import Router, { useRouter } from "next/router";
import { withMobx } from "next-mobx-wrapper";
import { configure } from "mobx";
import { Provider, useStaticRendering } from "mobx-react";
import * as getStores from "../stores";
import { tokenValidate } from "../api";
import cookies from "next-cookies";

// Service Worker (offline) & manifest
import { register, unregister } from 'next-offline/runtime';
import NextHead from "next/head";

const isServer = typeof window === "undefined";

configure({ enforceActions: "observed" });
useStaticRendering(isServer); // NOT `true` value

class Alicanto extends App {
  static async getInitialProps({ Component, ctx, res }) {
    let pageProps = {};
    const biscuits = cookies(ctx);

    if (typeof Component.getInitialProps === "function") {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      biscuits
    };
  }

  async componentDidMount() {
    console.log('component mount');
    register();

    const path =
      Router && Router.hasOwnProperty("pathname") ? Router.pathname : "";
    if (path.indexOf("/reset") > -1) {
      const query = Router.query;
      const token = query && query.hasOwnProperty("token") ? query.token : "";
      if (!token || !(await tokenValidate(token))) Router.push("/");
    }
  }

  render() {
    const { Component, pageProps, store, biscuits } = this.props;

    return (
      <Container>
        <Provider {...store}>
          <React.Fragment>
            <Component {...pageProps} {...biscuits} />
          </React.Fragment>
        </Provider>
      </Container>
    );
  }
}

export default withMobx(getStores)(Alicanto);
