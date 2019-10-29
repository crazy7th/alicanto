import Header from "../../../components/Layouts/HeaderTransaction";
import Favorite from "../../../components/Empty/Favorite";
import "../../../static/css/style.sass";

class Index extends React.Component {
  render() {
    return (
      <div className="App">
        <Header header="Favorit " />
        <Favorite />
      </div>
    );
  }
}

export default Index;
