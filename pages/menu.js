import React from "react";
import ListAllProduct from "../components/Homepage/SectionAllProduct";
import Category from "../components/Homepage/SectionProductCategory";
import Header from "../components/Layouts/HeaderTransaction";
import { inject } from "mobx-react";
import "../static/css/style.sass";

import * as Path from "../util/Path";
import * as Constants from "../util/Constants";

class ListProductType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProductType: []
    };
    this.getListProductType = this.getListProductType.bind(this);
    this.addLinkOnArray = this.addLinkOnArray.bind(this);
  }

  async componentDidMount() {
    await this.getListProductType();
    await this.addLinkOnArray(this.state.listProductType);
  }

  /**
   * Function to get list product type from API
   * @return none
   */
  async getListProductType() {
    const { showProductType } = this.props.productStore;
    const getProduct = await showProductType();
    const productType = getProduct.results;
    await this.setState({ listProductType: productType });
  }

  /**
   * Function to add link to list product type
   * @return none
   */
  async addLinkOnArray(listProduct) {
    const listLink = [
      { name: "Pulsa", link: "/transaction/pulsa" },
      { name: "Paket Data", link: "transaction/paket-data" },
      { name: "PLN Prepaid", link: "/transaction/pln" },
      { name: "PLN Post Paid", link: "/transaction/pln" },
      { name: "BPJS Kesehatan", link: "/transaction/bpjs-kesehatan" },
      { name: "Bayar BPJS Ketenagakerjaan", link: "#" },
      { name: "Pasca Bayar", link: "/transaction/mobile-postpaid" },
      { name: "Voucher", link: "#" },
      { name: "Tagihan Telkom", link: "/transaction/telkom" },
      { name: "Bayar Cicilan", link: "#" },
      { name: "Tagihan PDAM", link: "#" },
      { name: "Tiket Pesawat", link: "#" },
      { name: "Tiket KeretaApir", link: "#" },
      { name: "TV kable", link: "#" },
      { name: "Lifestyle", link: "#" },
      { name: "Hiburan", link: "#" },
      { name: Constants.VOUCHER_GAME, link: Path.VOUCHER_GAME },
      { name: "Attractions", link: "#" },
      { name: "Investasi", link: "#" },
      { name: "Donasi", link: "#" },
      { name: "Edukasi", link: "#" }
    ];
    let listProductLink = [];
    for (const i in listProduct) {
      for (const j in listLink) {
        const value = listLink[j];
        const { name, link } = value;
        if (listProduct[i].name === name) {
          listProduct[i].link = link;
          listProductLink.push(listProduct[i]);
        }
      }
    }
    await this.setState({ listProductType: listProductLink });
  }

  render() {
    return (
      <div className="App">
        <Header header="Semua Produk " />
        <Category />
        <ListAllProduct listMenu={this.state.listProductType} />
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(
  ListProductType
);
