let cf_problem_tags = {
    dsu: 6,
    greedy: 155,
    strings: 32,
    implementation: 174,
    '*1200': 13,
    'constructive algorithms': 100,
    'dfs and similar': 39,
    trees: 21,
    '*1500': 77,
    'binary search': 59,
    'data structures': 50,
    '*1100': 5,
    math: 159,
    'ternary search': 1,
    '*1700': 105,
    'brute force': 80,
    '*1300': 32,
    dp: 93,
    sortings: 67,
    'two pointers': 29,
    combinatorics: 33,
    'number theory': 56,
    '*1400': 52,
    '*1800': 50,
    geometry: 18,
    'meet-in-the-middle': 2,
    '*1600': 96,
    '*1900': 27,
    graphs: 39,
    'shortest paths': 8,
    'divide and conquer': 3,
    '*1000': 2,
    games: 8,
    bitmasks: 6,
    '*2100': 7,
    matrices: 8,
    '*2500': 2,
    '*2000': 17,
    'graph matchings': 1,
    probabilities: 3,
    '*2200': 4,
    interactive: 1,
    '*2900': 1,
    '*2700': 1,
    '*2300': 2,
    hashing: 4,
    'string suffix structures': 1,
    'expression parsing': 5
  };


var sortable = [];
for (var count in cf_problem_tags) {
    sortable.push([count, cf_problem_tags[count]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});

console.log(sortable);