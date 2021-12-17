import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    const onStart = () => {
      NProgress.start();
    };

    const onStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onStop);
    router.events.on('routeChangeError', onStop);

    return () => {
      router.events.off('routeChangeStart', onStop);
      router.events.off('routeChangeComplete', onStop);
      router.events.off('routeChangeError', onStop);
    };

  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
