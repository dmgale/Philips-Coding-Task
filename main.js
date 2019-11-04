// TODO 1. Pull all of the comments from the following endpoint

// Use Fetch API for URL - "https://jsonplaceholder.typicode.com/posts/1/comments"
// Create function to invoke fetch data
// Fetch data from URL (Promise based / Async Await)
// Assign response as JSON
// Console log data
// Add error handling

// TODO 2. The number of comments per post

/* Each comment contains: 
{
    "postId": int,
    "id":  int,
    "name": string,
    "email": string,
    "body": string
  },
*/

// Require the total number of comments
// Each post has a "postId", require total number of comments per post
// 1. Fetch data
// 2. Iterate through each comment
// 3. Create new 'comments' object with postId key value pairs 
//      - Reduce()
// 4. Console log comments data

// 5. Iterate through 'comments' object 
// 6. Create Groups according to total number of comments per postId
//    i.e. Group A =  post that have 'x' comments
//         Group B =  post that have 'x' comments
// 7. Return total number of comments per post (average) if many Groups
// 8. Display results in UI


// TODO 3. The most popular email address suffix i.e. .com 

// Require the email address suffix that appears the most
// Each comment has an 1 email address, key "email"
// 1. Fetch data
// 2. Iterate through each comment
// 3. Create new 'suffixes'  object with email key value pairs 
//      - Reduce()
// 4. Split email address at '.' - .split()
// 5. Remove last element on object - .pop()
// 6. Console log suffixes data

// 7. Iterate through 'suffixes' object 
// 8. Require Most Popular suffix:
//      - Return properties - Object.keys() & Reduce()
// 9. Require Most Popular Value:
//      - Loop of property values - Object.values()
//      - Return highest value - Math.max()
// 10. Display results in UI

// TODO 3. The most popular keywords in the body text

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