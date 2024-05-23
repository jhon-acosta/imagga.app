import esEs from 'antd/locale/es_ES'
import { App, ConfigProvider } from 'antd'
import PublicLayout from '@/components/PublicLayout'

import 'antd/dist/reset.css'
import '../assets/styles/globals.css'
import { AppPropsWithLayout } from '@/types/global'

const colorPrimary = '#005eff'

const BuenaVistaApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = PublicLayout

  return (
    <>
      <ConfigProvider
        locale={esEs}
        theme={{
          token: {
            colorPrimary,
            colorLink: colorPrimary,
            colorLinkHover: colorPrimary,
            colorBgLayout: '#eff5ff',
          },
        }}
      >
        <App>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </App>
      </ConfigProvider>
    </>
  )
}

export default BuenaVistaApp
