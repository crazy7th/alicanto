import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../../components/Layouts/HeaderTransaction";
import Alert from "../../../components/Transaction/PlnAlert";
import Input from "../../../components/Transaction/InputCustomerId";
import InputZone2 from "../../../components/Transaction/InputZonePDAM";
import HistoryTransaction from "../../../components/Transaction/HistoryTransaction";
import "../../../static/css/style.sass";

const styles = theme => ({
  button: {
    color: "#FF5959",
    background: "white"
  },
  buttonDisabled: {
    color: "white",
    background: "#B0B0B0"
  },
  buttonRed: {
    background: "#FF5959"
  },
  mt0: {
    marginTop: "-20px"
  },
  mt1: {
    marginTop: "-40px"
  }
});

class BpjsKesehatan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: ""
    };
    this.clearInput = this.clearInput.bind(this);
  }

  async changeInput(e) {
    // set number only
    const numberOnly = e.target.value.replace(/[^0-9]+/g, "");

    // convert 62 to 0
    let cleanPhone = numberOnly.replace(/^(62)/, "0").trim();

    // set warning if number phone > 13
    if (cleanPhone.length > 14) {
      await this.setState({ tooMuchDigit: true });
      cleanPhone = await cleanPhone.slice(0, 14);
    }

    // set state phone number with value input(number)
    await this.setState({ phone_number: cleanPhone });

    if (this.state.phone_number.length > 0) {
      this.setState({ showIconClear: true });
    } else {
      this.setState({ showIconClear: false });
    }
  }

  async clearInput() {
    await this.setState({
      phone_number: "",
      showIconClear: false,
      listDenom: [],
      showWarningLessDigit: false,
      tooMuchDigit: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Header header="Tagihan PDAM" />
        <Alert
          content="Sepulsa Mate, Pembayaran PDAM tidak dapat dilakukan 
          pada jam <span>23.00 - 00.30</span> WIB setiap harinya sesuai dengan 
          ketentuan dari PDAM"
        />
        <Paper elevation={0}>
          <Input
            changeCustomerInput={e => {
              this.changeInput(e);
            }}
            inputNumber={this.state.phone_number}
            clearInput={() => this.clearInput()}
            statusClear={this.state.showIconClear}
            labelInput="Nomor Pelanggan"
            placeHolder="1234xxx"
          />
          <div className={classes.mt1}>
            <InputZone2 />
          </div>
        </Paper>

        <div className={classes.mt0}>
          <div className="section section-plntab">
            <div className="section plntab-content">
              <Link href="/transaction/pdam/info">
                <Button
                  variant="contained"
                  type="submit"
                  className="button-red"
                >
                  Cek Tagihan
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <HistoryTransaction imageProduct="/static/transaction/icon-pdam.svg" />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BpjsKesehatan);
