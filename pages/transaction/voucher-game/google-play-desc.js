import React from "react";
import Link from "next/link";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import Header from "../../../components/Layouts/HeaderTransaction";
import "../../../static/css/style.sass";

import * as Path from "../../../util/Path";
import * as Constants from "../../../util/Constants";
import * as ConstantsImg from "../../../util/ConstantsImg";

const styles = theme => ({
  mt0: {
    marginTop: "-16px"
  }
});

class GooglePlayDesc extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Header header={Constants.VOUCHER_GAME_GOOGLE_PLAY} />
        <div className="section-google-play-desc">
          <Paper spacing={15} elevation={0} className="paper">
            <div align="center">
              <img className="img" src={ConstantsImg.VOUCHER_GAME_GOOGLE_PLAY_DESC} />
            </div>
            <div className="div">
              <p className="title">Satu tempat untuk segala bentuk hiburan</p>
              <p className="desc">
                Film, buku, majalah, atau aplikasi dan game Android terbaru—semua tersedia di Google Play.
              </p>
            </div>
            <div className="div">
              <p className="title">Kapan saja, dimana saja</p>
              <p className="desc">
                Akses film dan lainnya di perangkat Android, iPhone dan iPad, Chromecast, serta browser web Anda.
              </p>
            </div>
            <div>
              <p className="title">Belanja dengan cepat dan fleksibel</p>
              <p className="desc">
                Tak perlu kartu kredit untuk menukarkan kode voucher Google Play, dan masa berlaku saldo Anda tidak ada batasnya. Beli untuk orang terdekat atau hadiahkan kepada diri Anda sendiri.
              </p>
            </div>
          </Paper>
        </div>
        <div className="section-google-play-desc">
          <Paper spacing={15} elevation={0} className="paper">
            <div>
              <p className="title">Catatan:</p>
              <Link prefetch href={Path.VOUCHER_GAME_GOOGLE_PLAY_TNC}>
                <p className="desc">
                  Kode kartu hadiah ini hanya dapat digunakan di
                  Google Play. Permintaan penggunaan lain atas kode ini
                  dapat merupakan penipuan. Kunjungi <u>play.google.com/giftcardscam.</u>Untuk persayaratan lengkap
                  silakan <u>lihat di sini</u>
                </p>
              </Link>
            </div>
          </Paper>
        </div>
        <div className={classes.mt0}>
          <div className="section section-plntab">
            <div className="section plntab-content">
              <Link href={Path.VOUCHER_GAME_INPUT}>
                <Button variant="contained" type="submit" className="button-red">
                  Lanjutkan
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  GooglePlayDesc
);
