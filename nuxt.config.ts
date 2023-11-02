// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
		},
	},
	app: {
		head: {
		},
	},
	css: [
		"@/assets/css/main.css",
		"@fortawesome/fontawesome-svg-core/styles.css",
	],
	plugins: [
		{ src: "~/plugins/jquery", mode: "client" },
	],
	modules: ['@nuxt/image'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
