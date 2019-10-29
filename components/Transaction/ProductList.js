import React from "react";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { SlugMultiprice } from "../../components/Transaction/SlugMultiprice";

import * as Constants from "../../util/Constants"; 

class ListProductType extends React.Component {
  /**
  * Function to handle click item menu if needed
  *
  * @param  {string} title menu title
  * @return none
  */
  clickAction = async (title) => {
    if (title === Constants.VOUCHER_GAME_GOOGLE_PLAY) {
      await localStorage.setItem("productType", SlugMultiprice.voucherGooglePlay);
    } else {
      await localStorage.setItem("productType", SlugMultiprice.voucherGame);
    }
  }

  render() {
    return (
      <div className="section section-product">
        <Paper spacing={15} elevation={0} className="info-content">
          <div spacing={2} elevation={0} className="product-base product-menu">
            <Grid container wrap="nowrap" spacing={3} className="product-grid">
              {this.props.menus.map(menu => (
                <Link href={menu.link} key={menu.id} title={menu.title}>
                  <Grid item xs={3} align="center" className="product-item" onClick={() => {
                    if (this.props.isClick !== undefined) {
                      this.clickAction(menu.title);
                    }
                  }}>
                    <div className="product-icon">
                      <img src={menu.image} />
                    </div>
                    <p className="product-name"> {menu.title} </p>
                  </Grid>
                </Link>
              ))}
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ListProductType;
