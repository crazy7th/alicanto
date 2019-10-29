import Layout from "../../../components/Layouts/Layout";
import Header from "../../../components/Layouts/HeaderTransaction";
import Checkout from "../../../components/Dummy/BpjsKesehatanCheckout";
import "../../../static/css/style.sass";

const load = (
  <div>
    <Header header="Bayar BPJS Kesehatan" />

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
