window.onload = function () {
    function loadPage(route) {
        if (!route) route = 'home';
        const container = document.getElementById('container');
        fetch('pages/' + route + '.html')
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Page not found');
                }
            })
            .then(data => {
                container.innerHTML = data;
                document.title = route;
            })
            .catch(error => {
                container.innerHTML = "<h1>Page not found</h1>";
                console.error('Error loading the page:', error);
            });
    }


    const path = window.location.pathname.split('/')[1];
    loadPage(path || 'home');


    document.querySelectorAll('.menu_item').forEach(item => {
        item.addEventListener('click', function () {
            const route = item.getAttribute('value'); //route= about
            if (route === 'home') {
                window.history.pushState({}, '', '/');
            } else {
                window.history.pushState({}, '', '/' + route);
            }
            loadPage(route);
        });
    });


    window.onpopstate = function () {
        const path = window.location.pathname.split('/')[1];
        loadPage(path || 'home');
    };
};


