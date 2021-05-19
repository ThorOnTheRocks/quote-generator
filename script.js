const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const twitterBtn = document.querySelector(".twitter-btn");
const newQuoteBtn = document.querySelector(".new-quote");

let apiQuotes = [];

// Show new quote
function newQuote() {
  // Pick random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blankc and replace with "quote unknown"
  if (!quote.author) {
    quoteAuthor.textContent = 'Author Unkown';
  } else {
    quoteAuthor.textContent = quote.author;
  }

  // Check quote length to change style
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
}

// Get quotes from API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    console.log(apiQuotes);
  } catch (error) {
    // Catch error here
  }
}

// Tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuotes();