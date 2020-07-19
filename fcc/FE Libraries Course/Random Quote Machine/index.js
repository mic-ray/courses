// Array holding the quote objects
var quotes = [];

$(function () {
    // Initialize quote display
    initQuote();
    // Add event listener to new quote button
    $('#new-quote').click(() => setQuote());
});

/**
 * Initializes the quote display
 */
const initQuote = () => {
    // Get quotes from the provided gist
    $.ajax({
        url:
            'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: (res) => {
            quotes = JSON.parse(res).quotes;
            setQuote();
        },
    });
};

/**
 * Set a random quote to display
 */
const setQuote = () => {
    // Get a random quote
    let quote = getRandomQuote();
    // Set quote text and author
    $('#text').text('"' + quote.quote + '"');
    $('#author').text('- ' + quote.author);
    // Set link on tweet quote button to share quote
    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent('"' + quote.quote + '" -' + quote.author)
    );
};

/**
 * Returns a random quote
 */
const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
