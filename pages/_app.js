import "../styles/globals.css";
import "antd/dist/antd.css";
import Header from "../component/layout/header";
import DataProvider from "../context/dataStore";
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Header>
        <Component {...pageProps} />
      </Header>
    </DataProvider>
  );
}

export default MyApp;
