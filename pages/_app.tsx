import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/layout/layout";
import { orangeBlueTheme } from "../themes/orangeBlue";

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={orangeBlueTheme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
