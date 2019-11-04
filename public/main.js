const url = "https://jsonplaceholder.typicode.com/posts/1/comments";

//Fetch on First Load
getApiData();

//Last data refresh
function lastRefresh() {
    let apiFetch = new Date();
    document.getElementById('refreshDataTime').innerHTML = apiFetch
};

//Increment Objectives Data
function increment(holding, current) {
    if (holding[current]) {
        holding[current] += 1;
    } else {
        holding[current] = 1;
    }
};

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

    // Chart theme Colours
    const chartbackgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ]
    const chartBorderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ]


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

        //  LineChart - Comments
        let commentPerPostKey = Object.keys(commentsPerPost);
        let commentKeys = Object.keys(commentsData);
        let commentValue = Object.values(commentsData);
        let noPosts = commentValue.length;

        // Display in List
        document.getElementById('listCommentResult').innerHTML =
            `<p class="text-success">Total number of Comments per Post:</p> 
            Total of <font size="+2"><b> ${noPosts} </b></font> Posts, containing <font size="+2"><b> ${commentPerPostKey} </b></font> Comments per Post.`

        // Display in Chart
        let ctx = document.getElementById('myCommentsLineChart').getContext('2d');
        let myCommentsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: commentKeys,
                datasets: [{
                    label: ['# of times used'],
                    data: commentValue,
                    backgroundColor: chartbackgroundColor,
                    borderColor: chartBorderColor,
                    borderWidth: 1,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Comments vs Posts Line-Chart",
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '# of Comments per post',
                        },
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Post identified by its postId',
                        },
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    }
    getCommentsPerPost();

    // OBJECTIVE 2: Return Most Popular Suffix
    function getPopularEmailSuffix() {
        mostPopularSuffix = Object.keys(suffixesData)
            .reduce((a, b) => suffixesData[a] > suffixesData[b] ? a : b);

        suffixValue = Object.values(suffixesData);
        maxSuffixValue = Math.max(...suffixValue);

        // Display in List
        document.getElementById('listSuffixResult').innerHTML =
            `<p class="text-success">Most popular Email Suffix:</p> <font size="+2"><b> .${mostPopularSuffix} 
            </b></font> being used <font size="+2"><b> ${maxSuffixValue} </b></font> times.`

        mostPopularSuffixes = Object.assign(...Object
            .entries(suffixesData)
            .sort(({ 1: a }, { 1: b }) => b - a)
            .slice(0, 5)  // Return top 5 Suffixes
            .map(([key, value]) => ({ [key]: value })));

        // PieChart - Keywords
        let suffixKeys = Object.keys(mostPopularSuffixes);
        let suffixValues = Object.values(mostPopularSuffixes);

        // Display in Chart
        let ctx = document.getElementById('mySuffixPieChart').getContext('2d');
        let mySuffixChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: suffixKeys,
                datasets: [
                    {
                        data: suffixValues,
                        backgroundColor: chartbackgroundColor,
                        borderColor: chartBorderColor,
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "Suffix Doughnut Chart",
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
            .map(([key, value]) => ({ [key]: value })))

        // Barchart - Keywords
        let keywordKeys = Object.keys(mostPopularKeywords);
        let keywordValues = Object.values(mostPopularKeywords);

        // Display in List
        document.getElementById('listKeywordResult').innerHTML =
            `<p class="text-success">Most popular (Top 6) Keywords:</p> Words: <font size="+2"><b> ${keywordKeys.join(', ')}</b></font>
            <br>Occuring: <font size="+2"><b> ${keywordValues.join(', ')} </b></font> times respectively.`

        // Display in Chart
        let ctx = document.getElementById('myKeywordsBarChart').getContext('2d');
        let myKeywordsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: keywordKeys,
                datasets: [{
                    label: ['# of times used'],
                    data: keywordValues,
                    backgroundColor: chartbackgroundColor,
                    borderColor: chartBorderColor,
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Keyword Bar Chart",
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '# of Word Occurances',
                        },
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Keyword Word used in a Comments body text',
                        },
                        ticks: {
                            beginAtZero: true,
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