/*
		if('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js')
			.then(function(registration) {
			});
			navigator.serviceWorker.ready.then(function(registration) {
			});
        }
        */


       if('serviceWorker' in navigator){
           navigator.serviceWorker.register('/sw.js')
           .then((reg) => console.log('service worker registerd',reg))
           .catch((err) => console.log('service worker not registered',err))
       }