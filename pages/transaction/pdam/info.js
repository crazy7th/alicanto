import Layout from "../../../components/Layouts/Layout";
import Header from "../../../components/Layouts/HeaderTransaction";
import Checkout from "../../../components/Dummy/PdamCheckout";
import "../../../static/css/style.sass";

const load = (
  <div>
    <Header header="Tagihan PDAM" />

    <Checkout />
  </div>
);

function Index() {
  return (
    <div>
      <Layout content={load} />
    </div>
  );
}

export default Index;
