// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            style: [{
                children: 'body {background-color: #000}',
                type: 'text/css',
            }]
        }
    },
    build: {
        transpile: [({ isDev }) => isDev && 'nostr-tools']
    }
})
