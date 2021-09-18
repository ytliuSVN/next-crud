import Head from 'next/head';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='viewport-fit=cover' />
      </Head>
      <ChakraProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
