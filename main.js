const url = "https://jsonplaceholder.typicode.com/posts/1/comments"

async function getApiData() {
    const response = await fetch(url);
    const responseData = await response.json();
	console.log('Async Fetch:', responseData)
    // Add error handling

// TODO 2. The number of comments per post

    const comments = responseData.reduce((acc, { postId }) => {

        if (acc[postId]) {
            acc[postId] = acc[postId] + 1;
        } else {
            acc[postId] = 1;
        }
        return acc;
    }, {});
    console.log(comments); // 5 comments per postId exist x 100

// 5. Iterate through 'comments' object 
// 6. Create Groups according to total number of comments per postId
//    i.e. Group A =  post that have 'x' comments
//         Group B =  post that have 'x' comments
// 7. Return total number of comments per post (average) if many Groups
// 8. Display results in UI


// TODO 3. The most popular email address suffix i.e. .com 

    const suffixes = responseData.reduce((acc, { email }) => {
        const suffix = email.split('.').pop();

        if (acc[suffix]) {
            acc[suffix] = acc[suffix] + 1;
        } else {
            acc[suffix] = 1;
        }
        return acc;
    }, {});
    console.log(suffixes);

// 7. Iterate through 'suffixes' object 
// 8. Require Most Popular suffix:
//      - Return properties - Object.keys() & Reduce()
// 9. Require Most Popular Value:
//      - Loop of property values - Object.values()
//      - Return highest value - Math.max()
// 10. Display results in UI

// TODO 3. The most popular keywords in the body text

    const keywords = responseData.reduce((acc, { body }) => {
        const keywordList = body.split(/[\s\n]+/);
        keywordList.forEach((keyword) => {
            if (acc[keyword]) {
                acc[keyword] = acc[keyword] + 1;
            } else {
                acc[keyword] = 1;
            }
        });
        return acc;
    }, {});
    console.log(keywords);

    
} //<--- END OF CLICK EVENT LISTENER 


// Require the keywords (PLURAL) that appear the most
// Each comment has an 1 body text, key "body", with varying lenghts
// 1. Fetch data
// 2. Iterate through each comment
// 3. Create new 'keywords' object with word key value pairs 
// 4. Split bodytext for spaces and \n Line Feed - .split()
//         - Reduce() each after split
// 6. Console log keywords data

// 7. Iterate through 'keywords' object 
// 8. Collect all objects into a single object, 
// 9. Create a key for key/value pairs - Object.entries()
// 10. Sortby Descending order - sort()
// 11. Return the top (assume 5) keywords - slice() top 5 words
// 12. Map object with key value pair and return - map()
// 13. Display results in UI


// TODO 

// Reduce used 3x on fetched api data, refactor code into 1 function
// Refactor all 3 functions (objectives) out 