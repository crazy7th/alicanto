import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";

class ListProductType extends React.Component {
  render() {
    return (
      <div className="section section-product">
        <div spacing={2} elevation={0} className="product-base product-menu">
          <h2> Semua Produk </h2>
          <Grid container wrap="nowrap" spacing={3} className="product-grid">
            {this.props.listMenu.map(menu => (
              <Link href={menu.link} key={menu.id}>
                <Grid item xs={3} align="center" className="product-item">
                  <div className="product-icon">
                    <img src={menu.image} />
                  </div>
                  <p className="product-name"> {menu.name} </p>
                </Grid>
              </Link>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default ListProductType;
