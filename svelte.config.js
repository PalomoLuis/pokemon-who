import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// if true, will deploy the app using edge functions
			edge: false,
			external: [],
	   
			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app
			split: false
		  })
	},
	preprocess: vitePreprocess()
};

export default config;
