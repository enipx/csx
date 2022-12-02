import { useEffect } from 'react'
// csx
import csx from '../styles/csx.min'
import '../styles/csx.min.css'
// custom style
import '../styles/style.scss'

import { useRouter } from 'next/router'
import NProgress from 'nprogress'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // initialize csx
    csx.init();

    const handleRoute = (status) => {
      if (status === 'end') {
        NProgress.done();
      } else {
        NProgress.start();
      }
    }

    router.events.on('routeChangeStart', handleRoute);
    router.events.on('routeChangeComplete', () => handleRoute('end'));
    router.events.on('routeChangeError', () => handleRoute('end'));

    return () => {
      router.events.off('routeChangeStart', handleRoute);
      router.events.off('routeChangeComplete', () => handleRoute('end'));
      router.events.off('routeChangeError', () => handleRoute('end'));
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
