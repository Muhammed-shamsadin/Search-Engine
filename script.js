// Hardcoded list of documents with real images from Unsplash
const documents = [
    {
      text: "AI is transforming tech. AI tools are everywhere.",
    },
    {
      text: "AI powers machine learning. Learn AI today.",
    },
    {
      text: "special topics such as, Data science uses AI a bit. Focus is broader.",
    },
    {
      text: "Web Scraping codes",
    },
  ];
  
  // Function to count keyword frequency
  function countKeyword(text, keyword) {
    const words = text.toLowerCase().split(/\W+/);
    const keywordLower = keyword.toLowerCase();
    return words.filter((word) => word === keywordLower).length;
  }
  
  // Search and rank function
  function searchAndRank(docs, query) {
    return docs
      .map((doc, index) => {
        const frequency = countKeyword(doc.text, query);
        return {
          id: index + 1,
          content: doc.text,
          score: frequency,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);
  }
  
  // Display results
  function displayResults(results, query) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
  
    if (results.length === 0) {
      resultsDiv.innerHTML = `<p class="no-results">No documents found containing "${query}"</p>`;
      return;
    }
  
    results.forEach((doc, rank) => {
      const resultItem = document.createElement("div");
      resultItem.className = "result-item";
      resultItem.innerHTML = `
       
        <div class="result-content">
          <h3>${rank + 1}. [ID: ${doc.id}] <span class="score">Score: ${
        doc.score
      }</span></h3>
          <p>${doc.content}</p>
        </div>
      `;
      resultsDiv.appendChild(resultItem);
    });
  }
  
  // Run search
  function runSearch() {
    const userQuery = document.getElementById("searchInput").value;
    if (!userQuery || userQuery.trim() === "") {
      alert("Please enter a keyword! 🚀");
      return;
    }
    const rankedResults = searchAndRank(documents, userQuery);
    displayResults(rankedResults, userQuery);
  }
  
  // Trigger search on Enter key
  document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      runSearch();
    }
  });