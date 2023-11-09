import { Plugin } from '@nuxt/types'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import 'vanilla-cookieconsent/src/cookieconsent.js'

const cookieConsentPlugin: Plugin = async () => {
const config = useRuntimeConfig();

const api_cookie = config.public.api_cookie;

const { data, pending, error, refresh } = await  useFetch(api_cookie)
  // @ts-ignore
  const cookieConsent = window.initCookieConsent()
  // @ts-ignore
  cookieConsent.run(data.value.data?.attributes?.params)

}

export default cookieConsentPlugin
