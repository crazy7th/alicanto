import React from "react";
import Router from "next/router";
import { inject } from "mobx-react";
import getConfig from "next/config";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DenomInactive from "./DenomInactive";
import DenomActive from "./DenomActive";
import { SlugMultiprice } from "../../components/Transaction/SlugMultiprice";

class Nominal extends React.Component {
  constructor(props) {
    super(props);
    this.addToCartDenom = this.addToCartDenom.bind(this);
    this.setOptionValue = this.setOptionValue.bind(this);
  }

  /**
   * Function to add to cart if click denom
   * @param  {string} e value
   * @return none
   */
  async addToCartDenom(e) {
    // import some variable from store
    const { postCartWithOption } = this.props.transactionStore;
    const { token } = this.props.userStore;

    // get customer ID
    const customerId = this.props.customerId;
    if (customerId.length < 10) {
      // call warning text
      await this.props.changeStatus(true);
      return "addToCartFailed";
    } else {
      // get url from denom
      const url = e.target.getAttribute("url");

      // call loading page
      await this.props.changeStatusLoading(true);

      const optionValue = await this.setOptionValue();
      // console.warn("cek value pada option value", optionValue);

      const tokens = token.access ? token.access : this.props.token;

      // hit API add to cart with customer ID option
      const sendCart = await postCartWithOption(tokens, url, optionValue);

      if (sendCart.status === "200") {
        await localStorage.setItem("optionValue", JSON.stringify(optionValue));
        await localStorage.setItem("urlProduct", url);
        // change router to transaction payment
        Router.push("/transaction/checkout");

        // disable loading page
        await this.props.changeStatusLoading(false);
      } else if (sendCart.status === "401") {
        alert("sesi anda telah habis, silahkan login ulang lagi");
        // disable loading page
        await this.props.changeStatusLoading(false);

        Router.push("/signin");
      }
    }
  }

  async setOptionValue() {
    const typeOfProduct = localStorage.getItem("productType");
    const { publicRuntimeConfig } = getConfig();
    const customerId = this.props.customerId;
    const phoneNumber = this.props.phoneNumber;
    const endpoints =
      publicRuntimeConfig.baseURL + publicRuntimeConfig.apiEndpoints;

    if (typeOfProduct !== null) {
      switch (typeOfProduct) {
        case SlugMultiprice.pulsaPrepaid:
          return [
            { option: `${endpoints}oscar/options/1/`, value: customerId }
          ];
          break;
        case SlugMultiprice.paketData:
          return [
            { option: `${endpoints}oscar/options/1/`, value: customerId }
          ];
          break;
        case SlugMultiprice.plnPrepaid:
          return [
            { option: `${endpoints}oscar/options/1/`, value: customerId },
            { option: `${endpoints}oscar/options/3/`, value: phoneNumber }
          ];
          break;
        default:
      }
    }
  }

  render() {
    if (this.props.productList.length !== 0) {
      return (
        <React.Fragment>
          <div className="section section-nominal">
            {/* <PopupPaketData /> */}
            <Paper spacing={2} elevation={0} className="nominal-base">
              <div className="nominal-baselogo">
                <h2> {this.props.labelNominal} </h2>
                <img className="nominal-logo" src={this.props.logoOperator} />
              </div>
              <Grid
                container
                wrap="nowrap"
                spacing={2}
                className="nominal-grid"
              >
                {this.props.productList.map(product =>
                  product.is_active ? (
                    <DenomActive
                      key={product.id.toString()}
                      productId={product.id.toString()}
                      productUrl={product.product_url}
                      productLabel={product.product_label}
                      adminFee={product.admin_fee}
                      productPrice={product.price_excl_tax}
                      addToCart={e => this.addToCartDenom(e)}
                      description={product.description}
                      minHeight={this.props.minHeight}
                      productIsPromo={product.is_promo !== undefined ? true : false}
                      {...this.props}
                    />
                  ) : (
                    <DenomInactive
                      key={product.id.toString()}
                      productId={product.id.toString()}
                      productLabel={product.product_label}
                      productPrice={product.price_excl_tax.replace(
                        /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
                        "$1."
                      )}
                      {...this.props}
                    />
                  )
                )}
              </Grid>
            </Paper>
          </div>
        </React.Fragment>
      );
    } else {
      return <div />;
    }
  }
}

export default inject("userStore", "transactionStore")(Nominal);
