import '@/styles/global.sass'
import '../pages/CartPage/CartPageStyle.sass'
import '../elements/Pagination/Pagination.sass'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import { Provider } from 'react-redux'
import { Layout } from 'elements/Layout/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
