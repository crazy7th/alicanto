import React from "react";
import { inject } from "mobx-react";
import Menu from "../../../components/Transaction/ProductList";
import Header from "../../../components/Layouts/HeaderTransaction";
import "../../../static/css/style.sass";

const Finance = [
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-adira.svg",
    title: "Adira"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-baf.svg",
    title: "Bussan Auto Finance"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-mf.svg",
    title: "Mega Finance"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-maf.svg",
    title: "Mega Auto Finance"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-mcf.svg",
    title: "Mega Central Finance"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-wom.svg",
    title: "Wahana Ottomitra Multiartha"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-colombia.svg",
    title: "Colombia"
  },
  {
    link: "/transaction/multifinance/input",
    image: "/static/transaction/finance/icon-fif.svg",
    title: "Federal International Finance"
  }
];

class ListProductType extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header="Cicilan" />
        <Menu menus={Finance} />
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(
  ListProductType
);
