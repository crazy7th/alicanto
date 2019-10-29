import Header from "../../../components/Layouts/HeaderTransaction";
import History from "../../../components/Empty/History";
import "../../../static/css/style.sass";

class Index extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header="Riwayat Transaksi " />
        <History />
      </div>
    );
  }
}

export default Index;
