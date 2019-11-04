const url = "https://jsonplaceholder.typicode.com/posts/1/comments"

//Fetch on First Load
getApiData()

//Last data refresh
function lastRefresh() {
    var apiFetch = new Date();
    document.getElementById('refreshDataTime').innerHTML = apiFetch
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

    // OBJECTIVE 1: Return Number of Comments per Post
    function getCommentsPerPost() {

        const postIds = Object.keys(commentsData);
        const uniqueNumberOfPosts = [... new Set(Object.values(commentsData))];

        let commentsPerPost = {};
        uniqueNumberOfPosts.forEach(number => {
            commentsPerPost[number] = [];
            for (let index = 0; index < postIds.length; index++) {
                const _postId = postIds[index];
                const element = commentsData[_postId];
                if (element === number) {
                    commentsPerPost[number].push(_postId);
                };
            }
        })
        console.log(JSON.stringify(commentsPerPost));
    }
    getCommentsPerPost();

    // OBJECTIVE 2: Return Most Popular Suffix
    function getPopularEmailSuffix() {
        mostPopularSuffix = Object.keys(suffixesData)
            .reduce((a, b) => suffixesData[a] > suffixesData[b] ? a : b);

        value = Object.values(suffixesData);
        maxValue = Math.max(...value);

        // Display in List
        document.getElementById('listSuffixResult').innerHTML =
            `Most popular Suffix is <font size="+2"><strong> ${mostPopularSuffix} 
            </strong></font> being used <font size="+2"><strong> ${maxValue} </strong></font> times.`

        mostPopularSuffixes = Object.assign(...Object
            .entries(suffixesData)
            .sort(({ 1: a }, { 1: b }) => b - a)
            .slice(0, 5)  // Return top 5 Suffixes
            .map(([key, value]) => ({ [key]: value }))
        )

        // PieChart - Keywords
        var suffixKeys = Object.keys(mostPopularSuffixes)
        var suffixValues = Object.values(mostPopularSuffixes)

        // Display in Chart
        var ctx = document.getElementById('mySuffixPieChart').getContext('2d');
        var mySuffixChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: suffixKeys,
                datasets: [
                    {
                        data: suffixValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "Colors election"
                }
            }
        });
    };

    getPopularEmailSuffix();


    // OBJECTIVE 3: Return Most Popular Keywords
    function getPopularKeywords() {

        mostPopularKeywords = Object.assign(...Object
            .entries(keywordsData)
            .sort(({ 1: a }, { 1: b }) => b - a)
            .slice(0, 6)  // Return top 5 Keywords
            .map(([key, value]) => ({ [key]: value }))
        )

        // Barchart - Keywords
        var commentKeys = Object.keys(mostPopularKeywords)
        var commentValues = Object.values(mostPopularKeywords)
       
        // Display in List
        document.getElementById('listKeywordResult').innerHTML =
            `Most popular Keywords are <font size="+2"><b> ${commentKeys.join(', ')}
         </b></font><br> occuring <br> <font size="+2"><b> ${commentValues.join(', ')} </b></font> times respectively.
         <br> Assumption made: a total of top 6 Keywords is sufficient`

        // Display in Chart
        var ctx = document.getElementById('myKeywordsBarChart').getContext('2d');
        var myKeywordsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: commentKeys,
                datasets: [{
                    label: ['# of times used'],
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
                legend: {
                    display: false
                },
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

    // Reflect refresh on Time Display
    lastRefresh()
} //<--- END OF CLICK EVENT LISTENER 