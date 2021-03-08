import 'styles/globals/tailwind.css'
import 'styles/globals/tailwind-util.css'
import Layout from 'components/Layout/Layout'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import * as gtag from 'plugins/gtag'
import React from 'react'
import { useEffect } from 'react'
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <ReactNotification />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
