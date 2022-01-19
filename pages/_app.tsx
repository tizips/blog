import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Props } from 'service/props';
import NProgress from 'nprogress';
import { onView } from 'utils/gtag';

import 'styles/globals.scss';

function Application({ Component, pageProps }: Props.AppPropsWithLayout) {

  const router = useRouter();

  const onStartRouter = () => {
    NProgress.start();
  };

  const onStopRouter = () => {
    NProgress.done();
  };

  const onRouterComplete = (url: string) => {
    onStopRouter();

    if (process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS) onView(url);
  };

  useEffect(() => {

    router.events.on('routeChangeStart', onStartRouter);
    router.events.on('routeChangeComplete', onRouterComplete);
    router.events.on('routeChangeError', onStopRouter);

    return () => {
      router.events.off('routeChangeStart', onStopRouter);
      router.events.off('routeChangeComplete', onRouterComplete);
      router.events.off('routeChangeError', onStopRouter);
    };

  }, [router]);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      {
        /* Global Site Tag (gtag.js) - Google Analytics */
        process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS ?
          <Head>
            <script async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </Head> : <></>
      }
      <Component {...pageProps} />
    </>,
  );
}

export default Application;
