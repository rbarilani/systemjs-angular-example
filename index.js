/* global SystemJS */
SystemJS.import('app/bootstrap')
	.then(function (module) {
		return module.default; // es6 module default export
	})
	.then(function (bootstrap) {
		return bootstrap();
	})
	.then(function (exports) {
		console.log('app was booted!', exports);	
		console.log('angular version', exports.ng.version.full);
		console.log('future routes', JSON.stringify(exports.routes));
		console.log('app module requires', '"' + exports.ngModule.requires.join(', ') + '"' );
		
		// remove loading
		exports.ng.element(document.querySelector('.boostrap-cloak')).remove();
	})
	.catch(function (error) {
		// fatal error
		console.error(error);
		
		// replace loading with fatal error message
		document.querySelector('.boostrap-cloak').innerHTML = 'SOMETHING WENT TERRIBLY WRONG, TRY AGAIN LATER.';
	});