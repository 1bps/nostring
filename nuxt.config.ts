// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            style: [{
                children: 'body {backdround-color: #000}',
                type: 'text/css',
            }]
        }
    }
})
