const url = "https://jsonplaceholder.typicode.com/posts/1/comments"

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

    // Reduced Objective Data
    let commentsData = objective.comments;
    let suffixesData = objective.suffixes;
    let keywordsData = objective.keywords;


    // Popular Suffix
    function getPopularEmailSuffix() {
        mostPopularSuffix = Object.keys(suffixesData)
        .reduce((a, b) => suffixesData[a] > suffixesData[b] ? a : b);

        value = Object.values(suffixesData);
        maxValue = Math.max(...value);

        console.log("Most popular Suffix is " + mostPopularSuffix + " occuring " + maxValue + " times.");
        // 10. Display results in UI
    }
    getPopularEmailSuffix();


// TODO 2. The number of comments per post

function getCommentsPerPost() {

}
getCommentsPerPost();

// 5. Iterate through 'comments' object 
// 6. Create Groups according to total number of comments per postId
//    i.e. Group A =  post that have 'x' comments
//         Group B =  post that have 'x' comments
// 7. Return total number of comments per post (average) if many Groups
// 8. Display results in UI


// TODO 4. The most popular keywords in the body text

function getPopularKeywords() {

}
getPopularKeywords();

// 7. Iterate through 'keywords' object 
// 8. Collect all objects into a single object, 
// 9. Create a key for key/value pairs - Object.entries()
// 10. Sortby Descending order - sort()
// 11. Return the top (assume 5) keywords - slice() top 5 words
// 12. Map object with key value pair and return - map()
// 13. Display results in UI

} //<--- END OF CLICK EVENT LISTENER 

