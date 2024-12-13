/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Function to fetch a random quote
    let lastQuote = ""; // Хранит последнюю цитату

    function fetchQuote() {
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const apiUrl = encodeURIComponent("https://zenquotes.io/api/random");
        const uniqueUrl = `${proxyUrl}${apiUrl}&timestamp=${new Date().getTime()}`;
    
        fetch(uniqueUrl)
            .then(response => response.json())
            .then(data => {
                const parsedData = JSON.parse(data.contents);
                const quote = parsedData[0].q; 
                const author = parsedData[0].a;
    
                if (quote === lastQuote) {
                    console.log("Duplicate quote detected, fetching again...");
                    fetchQuote(); // Повторить запрос
                    return;
                }
    
                lastQuote = quote; // Обновить последнюю цитату
                document.getElementById('quote-text').textContent = `"${quote}"`;
                document.getElementById('quote-author').textContent = `- ${author}`;
            })
            .catch(error => console.error("Error fetching quote:", error));
    }

    // Add event listener to the "Get New Quote" button
    const newQuoteBtn = document.getElementById('new-quote-btn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', fetchQuote);
    }

    // Load the first quote when the page is loaded
    fetchQuote();
});
