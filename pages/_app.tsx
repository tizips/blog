import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Props } from 'service/props';
import NProgress from 'nprogress';

import 'styles/globals.scss';

function Application({ Component, pageProps }: Props.AppPropsWithLayout) {

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

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default Application;
