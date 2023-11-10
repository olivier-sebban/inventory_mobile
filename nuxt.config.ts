// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiStructure: process.env.apiStructure || "",
			apiRoom: process.env.apiRoom || "",
			api_cookie: process.env.API_COOKIE || "",
			apiSave: process.env.apiSave || "",
			apiSaveInventory: process.env.apiSaveInventory || "",
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
