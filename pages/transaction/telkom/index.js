import React from "react";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputField from "../../../components/Transaction/InputCustomerId";
import Header from "../../../components/Layouts/HeaderTransaction";
import HistoryTransaction from "../../../components/Transaction/HistoryTransaction";
import Alert from "../../../components/Dummy/TelkomAlert";
import "../../../static/css/style.sass";

const styles = theme => ({
  button: {
    color: "#FF5959 !important",
    background: "white"
  },
  buttonDisabled: {
    color: "white !important"
  },
  buttonRed: {
    background: "#FF5959 !important"
  }
});

class Telkom extends React.Component {
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
        <Header header="Tagihan Telkom" />
        <Alert />

        <div className="section section-plntab">
          <div className="section plntab-content">
            <InputField
              changeCustomerInput={e => {
                this.changeInput(e);
              }}
              inputNumber={this.state.phone_number}
              clearInput={() => this.clearInput()}
              statusClear={this.state.showIconClear}
              labelInput="Nomor Telepon"
              placeHolder="021345xxx"
            />
            <Link href="/transaction/telkom/info">
              <Button
                variant="contained"
                type="submit"
                className={classes.buttonRed}
              >
                Cek Tagihan
              </Button>
            </Link>
            <HistoryTransaction imageProduct="/static/transaction/icon-telkom.svg" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Telkom);
