import React from "react";
import Router from "next/router";
import Link from "next/link";

import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import Header from "../../../components/Layouts/HeaderTransaction";
import "../../../static/css/style.sass";

import * as Constants from "../../../util/Constants";
import * as ConstantsImg from "../../../util/ConstantsImg";

const ExpansionPanelSummary = withStyles({
  root: {
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    }
  },
  expanded: {},
})(MuiExpansionPanelSummary);
class GooglePlayTnc extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header={Constants.VOUCHER_GAME_GOOGLE_PLAY} />
        <div className="section-google-play-desc">
          <Paper spacing={15} elevation={0} className="paper">
            <div align="center">
              <img src={ConstantsImg.VOUCHER_GAME_GOOGLE_PLAY_TNC} />
            </div>
            <div align="center">
              <p className="desc tnc-text-header">
                Sepulsa adalah partner resmi kode voucher Google Play
              </p>
            </div>
          </Paper>
        </div>
        <div className="section-google-play-desc">
          <ExpansionPanel
            elevation={0}
          >
            <ExpansionPanelSummary className="expansion-summary" expandIcon={<ExpandMoreIcon />}>
              <p className="title">Syarat dan Ketentuan Penukaran Kode Voucher Google Play</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="expansion-details">
              <div className="desc">
                <ol>
                  <li>Persyaratan dan Ketentuan​: Lihat persyaratan dan kebijakan privasi lengkap di <u>play.google.com/id-card- terms.</u></li>
                  <li>Kartu hadiah Google Play diterbitkan oleh Google Arizona LLC (“GAZ”).</li>
                  <li>Pengguna harus merupakan penduduk Indonesia yang berusia 13 tahun ke atas dengan akun Google Payments untuk Indonesia dan memiliki akses internet untuk melakukan penukaran.</li>
                  <li>Saldo yang telah ditukarkan dikelola oleh afiliasi GAZ, yaitu Google Payment Corp. (“GPC”), di akun Google Payments Anda.</li>
                  <li>Hanya berlaku untuk pembelian item-item tertentu di Google Play.</li>
                  <li>Tidak berlaku untuk perangkat keras dan langganan tertentu. Batasan-batasan lain dapat berlaku. Tidak dikenakan biaya.</li>
                  <li>Kecuali diwajibkan oleh undang-undang, kartu tidak dapat ditukarkan dengan uang ​tunai ​atau kartu lain; tidak dapat digunakan untuk menambah saldo rekening; tidak dapat diisi ulang atau dikembalikan dananya; tidak dapat digabungkan dengan saldo non- Google Play, dijual kembali, ditukarkan, atau ditransfer nilainya.</li>
                  <li>Pengguna bertanggung jawab atas hilangnya kartu.</li>
                  <li>​Untuk bantuan atau untuk melihat saldo, silakan kunjungi <u>support.google.com/googleplay/go/cardhelp.</u></li>
                </ol>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className="section-google-play-desc">
          <ExpansionPanel
            elevation={0}
          >
            <ExpansionPanelSummary className="expansion-summary" expandIcon={<ExpandMoreIcon />}>
              <p className="title">Cara Redeem Kode Voucher dengan Web</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="expansion-details">
              <div className="desc">
                <ol>
                  <li>Buka situs <u>play.google.com/redeem</u></li>
                  <li>Masukkan kode Google Play</li>
                  <li>Mulailah berbelanja</li>
                </ol>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className="section-google-play-desc">
          <ExpansionPanel
            elevation={0}
          >
            <ExpansionPanelSummary className="expansion-summary" expandIcon={<ExpandMoreIcon />}>
              <p className="title">Cara Redeem Kode Voucher dengan Android Phone / Tablet</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="expansion-details">
              <div className="desc">
                <ol>
                  <li>Buka aplikasi Google Play Store di Android phone atau tablet kamu</li>
                  <li>Pilih tukarkan</li>
                  <li>Masukkan kode Google Play</li>
                  <li>Mulailah berbelanja</li>
                </ol>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className="section-google-play-desc">
          <Link>
            <Button
              variant="contained"
              elevation={0}
              fullWidth
              size="large"
              className="back-button"
              onClick={() => Router.back()}
            >
              Kembali
          </Button>
          </Link>
        </div>
      </div >
    );
  }
}

export default (
  GooglePlayTnc
);
