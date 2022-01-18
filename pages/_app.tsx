import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Props } from 'service/props';
import NProgress from 'nprogress';

import 'styles/globals.scss';

function Application({ Component, pageProps }: Props.AppPropsWithLayout) {

  const router = useRouter();

  const onStartRouter = () => {
    NProgress.start();
  };

  const onStopRouter = () => {
    NProgress.done();
  };

  useEffect(() => {

    router.events.on('routeChangeStart', onStartRouter);
    router.events.on('routeChangeComplete', onStopRouter);
    router.events.on('routeChangeError', onStopRouter);

    return () => {
      router.events.off('routeChangeStart', onStopRouter);
      router.events.off('routeChangeComplete', onStopRouter);
      router.events.off('routeChangeError', onStopRouter);
    };

  }, [router]);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      {
        process?.env?.NEXT_PUBLIC_ANALYTICS ?
          <Head>
            <script dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_ANALYTICS }} />
          </Head> : <></>
      }
      <Component {...pageProps} />
    </>,
  );
}

export default Application;
