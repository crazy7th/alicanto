import Header from "../../../components/Layouts/HeaderTransaction";
import Tab from "../../../components/Transaction/PlnTab";
import "../../../static/css/style.sass";

class TransactionPLN extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header="Listrik PLN " routerBack="/" />
        <Tab {...this.props} />
      </div>
    );
  }
}

export default TransactionPLN;
