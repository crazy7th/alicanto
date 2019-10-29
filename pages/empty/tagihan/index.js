import Header from "../../../components/Layouts/HeaderTransaction";
import Tagihan from "../../../components/Empty/Tagihan";
import "../../../static/css/style.sass";

class Index extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header="Tagihan PDAM" />
        <Tagihan />
      </div>
    );
  }
}

export default Index;
