/* init.ts

manages main startup of the site */
import * as Vue from '../../ext/vue-3.1.5/vue.runtime.esm-bundler';
import * as Quasar from '../../ext/quasar-2.0.3/quasar.umd';

export function init(vueComponents:{name:string,value:Vue.Component}[]) {
	const app : Vue.App<Element> = Vue.createApp({
		setup () {
			return {};
		},
	});
	{
		const len = vueComponents.length;
		for(let idx=0; idx < len; idx++) {
			const entry = vueComponents[idx];
			app.component(entry.name, entry.value);
		}
	}
	debugger;

	app.use(Quasar, {
		config: {
			/*
			brand: {
				// primary: '#e46262',
				// ... or all other brand colors
			},
			notify: {...}, // default set of options for Notify Quasar plugin
			loading: {...}, // default set of options for Loading Quasar plugin
			loadingBar: { ... }, // settings for LoadingBar Quasar plugin
			// ..and many more (check Installation card on each Quasar component/directive/plugin)
			*/
		},
	});
	app.mount('#bodyContents');
}
