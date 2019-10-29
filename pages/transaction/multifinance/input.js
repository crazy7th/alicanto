import Button from "@material-ui/core/Button";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../../components/Layouts/HeaderTransaction";
import Input from "../../../components/Transaction/InputCustomerId";
import HistoryTransaction from "../../../components/Transaction/HistoryTransaction";
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

class MultiFinance extends React.Component {
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
        <Header header="Cicilan" />

        <div className="section section-plntab">
          <div className="section plntab-content">
            <Input
              changeCustomerInput={e => {
                this.changeInput(e);
              }}
              inputNumber={this.state.phone_number}
              clearInput={() => this.clearInput()}
              statusClear={this.state.showIconClear}
              labelInput="Nomor Pelanggan"
              placeHolder="021345xxx"
              id="phone_number"
              name="phone_number"
            />
            <Link href="/transaction/multifinance/info">
              <Button variant="contained" type="submit" className="button-red">
                Cek Tagihan
              </Button>
            </Link>
          </div>
        </div>

        <HistoryTransaction imageProduct="/static/transaction/icon-finance.svg" />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MultiFinance);
