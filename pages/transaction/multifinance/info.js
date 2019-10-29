import Layout from "../../../components/Layouts/Layout";
import Header from "../../../components/Layouts/HeaderTransaction";
import Checkout from "../../../components/Dummy/FinanceCheckout";
import "../../../static/css/style.sass";

const load = (
  <div>
    <Header header="Cicilan" />

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
