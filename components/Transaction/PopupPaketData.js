import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Loading from "../Loader/LoadingSepulsa";

class PopupPaketData extends React.Component {
  constructor(props) {
    super(props);
    this.addToCartValidate = this.addToCartValidate.bind(this);
  }

  /**
   * Function to close pop up when failed add to cart
   * @param  {string} e value
   * @return none
   */
  async addToCartValidate(e) {
    const responseAddCart = await this.props.addToCart(e);
    if (responseAddCart === "addToCartFailed") {
      await this.props.changeShowPopUp(false);
    }
  }

  render() {
    return (
      <div className="section \">
        <Drawer
          anchor="bottom"
          open={this.props.showPopUp}
          onClose={() => this.props.changeShowPopUp(false)}
          className="prod-info"
          elevation={0}
        >
          {this.props.loading ? <Loading /> : ""}
          <div tabIndex={0} role="button">
            <div className="prod-info__header">
              <div className="prod-info__header-left">
                <p>
                  <span>{this.props.product_label}</span>
                </p>
              </div>
            </div>
            <div className="prod-info__bottom">
              <img
                className="prod-info__close"
                src="/static/transaction/icon-close.svg"
                onClick={() => this.props.changeShowPopUp(false)}
              />
              <div
                className="prod-info__number"
                dangerouslySetInnerHTML={{ __html: this.props.description }}
              />
              <Button
                variant="contained"
                fullWidth
                url={this.props.url}
                product_label={this.props.product_label}
                admin_fee={this.props.admin_fee}
                price={this.props.price}
                onClick={e => this.addToCartValidate(e)}
              >
                <p
                  className="MuiButton-label"
                  style={{ color: "white" }}
                  url={this.props.url}
                  product_label={this.props.product_label}
                  admin_fee={this.props.admin_fee}
                  price={this.props.price}
                >
                  Lanjut ke pembayaran
                </p>
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default PopupPaketData;
