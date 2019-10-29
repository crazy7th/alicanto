import React from "react";
import { inject } from "mobx-react";

import Menu from "../../../components/Transaction/ProductList";
import Header from "../../../components/Layouts/HeaderTransaction";
import "../../../static/css/style.sass";

import * as Path from "../../../util/Path";
import * as Constants from "../../../util/Constants";
import * as ConstantsImg from "../../../util/ConstantsImg";

const VoucherGame = [
  {
    link: Path.VOUCHER_GAME_INPUT,
    image: ConstantsImg.VOUCHER_GAME_STEAM,
    title: Constants.VOUCHER_GAME_STEAM_IDR
  },
  {
    link: Path.VOUCHER_GAME_INPUT,
    image: ConstantsImg.VOUCHER_GAME_STEAM,
    title: Constants.VOUCHER_GAME_STEAM_USD
  },
  {
    link: Path.VOUCHER_GAME_INPUT,
    image: ConstantsImg.VOUCHER_GAME_ITUNES,
    title: Constants.VOUCHER_GAME_ITUNES
  },
  {
    link: Path.VOUCHER_GAME_GOOGLE_PLAY_DESC,
    image: ConstantsImg.VOUCHER_GAME_GOOGLE_PLAY,
    title: Constants.VOUCHER_GAME_GOOGLE_PLAY
  },
  {
    link: Path.VOUCHER_GAME_INPUT,
    image: ConstantsImg.VOUCHER_GAME_LYTO,
    title: Constants.VOUCHER_GAME_LYTO
  }
];

class ListVoucherGame extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header={Constants.VOUCHER_GAME} />
        <Menu menus={VoucherGame} isClick={true} />
      </div>
    );
  }
}

export default inject("userStore", "productStore", "transactionStore")(
  ListVoucherGame
);
