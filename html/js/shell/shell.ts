declare var requirejs:any;
declare var define:any;

/* portal.ts - Initial bootstrap of the main interface */
(function(global:typeof globalThis) {

//	const SENTRY_DSN = '***DSN***';
//	const SENTRY_ENVIRONMENT = '***NAME***';
	
	function doGenericCatch(err:any, transaction:string, context?:any) {
/*		if(!('Sentry' in window)) return;
		if(err instanceof Error) {
			Sentry.withScope((scope:any) => {
				if(context) scope.setExtra('context', context);
				scope.setTransaction(transaction);
				Sentry.captureMessage(err, Sentry.Severity.Error);
			});
		} else {
			const message = (typeof err == 'string' ? err : JSON.stringify(err));
			const stackMark = new Error(message);
			Sentry.withScope((scope:any) => {
				if(context) scope.setExtra('context', context);
				scope.setExtra('errorThrown', err);
				scope.setTransaction(transaction);
				Sentry.captureMessage(stackMark, Sentry.Severity.Error);
			});
		}*/
	}

	function loadScript(url:string) : Promise<void>
	{
		return new Promise((resolve:()=>void, reject:(e:any)=>void) => {
			const script = <HTMLScriptElement>document.createElement('SCRIPT');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', url);
			
			// way too many different ways that browsers do callbacks...
			const oldOnload = script.onload;
			const oldOnerror = script.onerror;
			const oldOnreadystatechange = (script as any).onreadystatechange;
			
			function resetCallbacks() {
				script.onload = oldOnload;
				script.onerror = oldOnerror;
				(script as any).onreadystatechange = oldOnreadystatechange;
			}
			
			script.onload = () => {
				resolve();
				resetCallbacks();
			};
			script.onerror = (evt) => {
				reject(evt);
				resetCallbacks();
			};
			(script as any).onreadystatechange = () => {
				if((script as any).readyState == 'loaded' || (script as any).readyState == 'complete')
				{
					resolve();
					resetCallbacks();
				}
			};
			try
			{
				document.body.appendChild(script);
			}
			catch(e)
			{
				reject(e);
				resetCallbacks();
			}
		});
	}

	let HEAD_OBJECT : HTMLHeadElement|null = null;
	function getHead() : HTMLHeadElement|null
	{
		if(!HEAD_OBJECT)
		{
			const headObjs = document.getElementsByTagName('HEAD');
			HEAD_OBJECT = <HTMLHeadElement|null>(headObjs?.length && headObjs[0]);
			if(!HEAD_OBJECT){debugger; return null;}
		}
		return HEAD_OBJECT;
	}

	const STYLES_LOADED : {[key:string]:boolean} = {};
	function loadStyle(url:string)
	{
		if(STYLES_LOADED[url]) return;
		const headObj = getHead();
		if(!headObj){debugger; return;}
		
		const newUrl = url;
		//if(newUrl.indexOf('?') == -1) newUrl += '?' + Date.now();
		const style = <HTMLLinkElement>document.createElement('LINK');
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('type', 'text/css');
		style.setAttribute('href', newUrl);
		headObj.appendChild(style);
		STYLES_LOADED[url] = true;
	}

	function startupRequireJs() {
		// create aliases for resolving dependencies
		define('tslib', ['tslib/tslib.es6'], (lib:any) => lib);
		define('vue', ['ext/vue-3.1.5/vue.runtime.esm-bundler'], (lib:any) => lib);
		define('@vue/shared', ['@vue/shared/dist/shared.esm-bundler'], (lib:any) => lib);
		define('@vue/reactivity', ['@vue/reactivity/dist/reactivity.esm-bundler'], (lib:any) => lib);
		define('@vue/runtime-core', ['@vue/runtime-core/dist/runtime-core.esm-bundler'], (lib:any) => lib);
		define('@vue/runtime-dom', ['@vue/runtime-dom/dist/runtime-dom.esm-bundler'], (lib:any) => lib);

		// define dummy type definitions that are apparently being requested by the main script

		requirejs.config({});
	}
/*
	// adapted from Sentry's error logging
	function logVueWarning(msg: string, vm: any, trace: string): void {

		//const COMPONENT_NAME_REGEXP = /(?:^|[-_/])(\w)/g;
		const ROOT_COMPONENT_NAME = 'root';
		const ANONYMOUS_COMPONENT_NAME = 'anonymous component';

		function getComponentName(vm: any): string {
			// Such level of granularity is most likely not necessary, but better safe than sorry. — Kamil
			if (!vm) {
				return ANONYMOUS_COMPONENT_NAME;
			}

			if (vm.$root === vm) {
				return ROOT_COMPONENT_NAME;
			}

			if (!vm.$options) {
				return ANONYMOUS_COMPONENT_NAME;
			}

			if (vm.$options.name) {
				return vm.$options.name;
			}

			if ((<any>vm.$options)._componentTag) {
				return (<any>vm.$options)._componentTag;
			}

			return ANONYMOUS_COMPONENT_NAME;
		}
		
		const metadata: any = {};

		if (vm) {
			try {
				metadata.componentName = getComponentName(vm);
				metadata.propsData = (<any>vm).$options.propsData;
			} catch (_oO) {
				console.log('Unable to extract metadata from Vue component.');
			}
		}

		const err = new Error(msg);

		Sentry.withScope((scope:any) => {
			scope.setContext('vue', metadata);
			Sentry.captureMessage(err, Sentry.Severity.Warning);
		});

		// eslint-disable-next-line no-console
		console.error("[Vue warn]: " + msg + trace);
	}
*/
	const vueComponents : {name:string,value:object}[] = [];

	function beginLoad() {
		const messageText = document.getElementById('initialProgressMsg');
		if(messageText) messageText.textContent = 'Please wait...';

		function loadTimeout() {
			if(messageText) {
				messageText.textContent = 'Having trouble loading the page, please refresh';
			}
		}
		
		const loadTimer = window.setTimeout(loadTimeout, 30000);
		loadStyle('lib/main.css');
		loadScript('lib/node.js')
			.then(() => loadScript('lib/main.js'))
			.then(() => {
				const oldDefine = define;
				let pendingComponents : string[]|null = null;

				define = function(this:any, name:string) {
					const ret = oldDefine.apply(this, arguments);
					if(name.match(/^vue\//)) {
						if(pendingComponents) {
							pendingComponents.push(name);
						} else {
							pendingComponents = [name];
							global.setTimeout(declareVueComponents, 0);
						}
					}
					return ret;
				}

				function declareVueComponents() {
					if(!pendingComponents) return; // shouldn't happen
					const thisPass = pendingComponents;
					pendingComponents = null;

					requirejs(thisPass, function() {
						const len = thisPass.length;
						for(let idx=0; idx < len; idx++) {
							const componentMatch = thisPass[idx].match(/^vue\/(.+)$/);
							if(componentMatch) {
								vueComponents.push({name:componentMatch[1], value:arguments[idx].default});
							}
						}
					});
				}

				return loadScript('lib/vue.js')
					.then(() => { declareVueComponents() });
			})
			.then(() => {
				// initialize RequireJS and transfer control to the main script area
				startupRequireJs();
				requirejs(
					['js/main/init'],
					(init:any) =>
				{
/*
					if('Sentry' in global) {
						Sentry.init({
							dsn: SENTRY_DSN,
							environment: SENTRY_ENVIRONMENT,
							integrations: [new Sentry.Integrations.Vue({
								Vue,
								attachProps: true,
								logErrors: true,
							})]
						});
						Vue.config.warnHandler = logVueWarning;
					}
*/
					window.clearTimeout(loadTimer);
					if(messageText) {
						messageText.textContent='';
					}
					init.init(vueComponents);
				});
			})
			.catch((reason:any) => {
				doGenericCatch(reason, 'shell.shell.beginLoad.waitForMain');
			});
	}
/*
	if('Sentry' in global) {
		Sentry.init({
			dsn: SENTRY_DSN,
			environment: SENTRY_ENVIRONMENT
		});
	}
*/
	global.onload = beginLoad;
})(this);
