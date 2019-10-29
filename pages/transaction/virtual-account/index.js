import Layout from "../../../components/Layouts/Layout";
import Header from "../../../components/Layouts/HeaderTransaction";
import VA from "../../../components/Transaction/VirtualAccount";
import "../../../static/css/style.sass";

const load = (
  <div>
    <Header header="Pembayaran" />

    <VA />
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
