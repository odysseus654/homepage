/* init.ts

manages main startup of the site */
import * as Vue from '../../ext/vue-3.1.5/vue.runtime.esm-bundler';
import * as Quasar from '../../ext/quasar-2.0.3/quasar.umd';

export function init(vueComponents:{name:string,value:Vue.Component}[]) {
	// yay we have to have the root layout available before initializing the app?!?
	let rootLayout : Vue.Component|undefined;

	{
		const len = vueComponents.length;
		for(let idx=0; idx < len; idx++) {
			const entry = vueComponents[idx];
			if(entry.name == 'layout') {
				rootLayout = entry.value;
				break;
			}
		}
	}

	const app : Vue.App<Element> = Vue.createApp(rootLayout!, {useQuasar:Quasar.useQuasar});
	{
		const global = (window as Record<string,any>);
		if('__VUE_DEVTOOLS_GLOBAL_HOOK__' in global) {
			global.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
		}
	}

	{
		const len = vueComponents.length;
		for(let idx=0; idx < len; idx++) {
			const entry = vueComponents[idx];
			app.component(entry.name, entry.value);
		}
	}

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

	const loadingDiv = document.getElementById('initial') as HTMLDivElement;
	if(loadingDiv) loadingDiv.parentElement!.removeChild(loadingDiv);

	const bodyContents = document.getElementById('bodyContents')! as HTMLDivElement;
	bodyContents.style.display = 'block';
	app.mount(bodyContents);
}
