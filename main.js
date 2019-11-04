const url = "https://jsonplaceholder.typicode.com/posts/1/comments"

//Fetch on First Load
getApiData()

//Last data refresh
function lastRefresh() { 
    var apiFetch = new Date();
    document.getElementById('refreshDataTime').innerHTML=apiFetch
}

//Increment Objectives Data
function increment(holding, current) {
    if (holding[current]) {
        holding[current] += 1;
    } else {
        holding[current] = 1;
    }
}

// Fetch API & Reduce Data
async function getApiData() {
    const response = await fetch(url);
    const responseData = await response.json();
    // Add error handling

    const objective = responseData.reduce((acc, { postId, email, body }) => {
        // Comments:
        increment(acc.comments, postId);
        // Suffixes: 
        const suffix = email.split('.').pop();
        increment(acc.suffixes, suffix);
        // Keywords: 
        const keywordList = body.split(/[\s\n]+/);
        keywordList.forEach((keyword) => increment(acc.keywords, keyword));
        return acc;
    }, {
        comments: {},
        suffixes: {},
        keywords: {},
    })

    // Output Reduced Objective Data
    let commentsData = objective.comments;
    let suffixesData = objective.suffixes;
    let keywordsData = objective.keywords;


    // Return Most Popular Suffix
    function getPopularEmailSuffix() {
        mostPopularSuffix = Object.keys(suffixesData)
            .reduce((a, b) => suffixesData[a] > suffixesData[b] ? a : b);

        value = Object.values(suffixesData);
        maxValue = Math.max(...value);

        console.log("Most popular Suffix is " + mostPopularSuffix + " occuring " + maxValue + " times.");
        //TODO Display results in UI
    }
    getPopularEmailSuffix();


    // Return Most Popular Keywords
    function getPopularKeywords() {
        mostPopularKeywords = Object.assign(...Object
            .entries(keywordsData)
            .sort(({ 1: a }, { 1: b }) => b - a)
            .slice(0, 6)  // Return top 5 Keywords
            .map(([key, value]) => ({ [key]: value }))
            )

    var commentKeys = Object.keys(mostPopularKeywords)  // Return top 5 Keywords
    var commentValues = Object.values(mostPopularKeywords)  // Return top 5 Keywords
    
    console.log([commentKeys])
    console.log([commentValues])

// Large Barchart Keywords

    var ctx = document.getElementById('myKeywordsChart').getContext('2d');
    var myKeywordsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: commentKeys,
            datasets: [{
                label: ['Top  Keywords'],
                data: commentValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

    getPopularKeywords();


    // Return Number of Comments per Post
    function getCommentsPerPost() {

        // 5. Iterate through 'comments' object 
        // 6. Create Groups according to total number of comments per postId
        //    i.e. Group A =  post that have 'x' comments
        //         Group B =  post that have 'x' comments
        // 7. Return total number of comments per post (average) if many Groups
        // 8. Display results in UI
        
        }
        getCommentsPerPost();

        // Reflect refresh on Time Display
        lastRefresh()
} //<--- END OF CLICK EVENT LISTENER 