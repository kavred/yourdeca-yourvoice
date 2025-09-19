(function() {
	function enableSoftTransitions() {
		var links = document.querySelectorAll('a[href]');
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			var href = link.getAttribute('href');
			if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
			link.addEventListener('click', function(e) {
				var target = e.currentTarget;
				var url = target.getAttribute('href');
				if (!url) return;
				if (url.indexOf(location.origin) === 0 || url.indexOf('http') !== 0) {
					e.preventDefault();
					document.body.classList.add('fade-out');
					setTimeout(function() { window.location.href = url; }, 180);
				}
			});
		}
	}

	function enableRevealOnScroll() {
		var elements = document.querySelectorAll('.reveal');
		if (!('IntersectionObserver' in window)) {
			for (var i = 0; i < elements.length; i++) {
				elements[i].classList.add('in-view');
			}
			return;
		}
		var observer = new IntersectionObserver(function(entries) {
			for (var i = 0; i < entries.length; i++) {
				var entry = entries[i];
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					observer.unobserve(entry.target);
				}
			}
		}, { threshold: 0.15 });
		for (var j = 0; j < elements.length; j++) {
			observer.observe(elements[j]);
		}
	}

	document.addEventListener('DOMContentLoaded', function() {
		enableSoftTransitions();
		enableRevealOnScroll();
	});
})(); 