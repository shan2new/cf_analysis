
var request = require('request')
var rp = require('request-promise');
const cheerio = require('cheerio')
var fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

// Constants
const CF_CONTEST_LIST_API = "https://codeforces.com/api/contest.list"
const CF_PREFIX = "https://codeforces.com"
const categories = ["(Div. 2)","(Educational)","(Div. 3)" ] 


const core_logic = async (driver, problem_url) => {
    await driver.get(problem_url);
    let elements = await driver.findElements(By.css(".tag-box"))

    let vals = []
    for(var i = 0; i < elements.length; i ++) {
        vals.push(await elements[i].getText())
    }
    console.log(vals);
    return vals;
} 

async function getTagsFrequency(problem_urls) {
    let driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();

    let cf_tag_count = {};
    for(var i = 0;i < problem_urls.length; i ++) {
        let cf_tags = await core_logic(driver, problem_urls[i]);
        cf_tags.forEach((tag) => {
            if(!cf_tag_count[tag]) {
                cf_tag_count[tag] = 0;
            }
            cf_tag_count[tag]++;
        })
    }

    var sortable = [];
    for (var count in cf_tag_count) {
        sortable.push([count, cf_problem_tags[count]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    console.log(sortable);
    await driver.quit();
}


const isIncludedCategory = (contestName) => {
    return categories.reduce((skipCumm, category) => {
        return skipCumm || contestName.indexOf(category) > -1;
    }, false)
} 

const getAllContests = () => {
    return rp(CF_CONTEST_LIST_API).then((body) => {
        if(body) {
            return JSON.parse(body).result;
        } 
        return null;
    }).catch((err) => {
        console.log("[getAllContests] ERR: ", err)
    });
}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
    msleep(n*1000);
}

const getAllProblemUrls = function(contests, type) {
    contests =  contests.filter((contest) => {
        return isIncludedCategory(contest.name);            
    })

    return contests.map((contest) => {
        return `https://codeforces.com/contest/${contest.id}/problem/${type}`
    })
}

const runAnalysis = async () => {
    contests = await getAllContests();

    let problem_urls = getAllProblemUrls(contests, 'C');

    await getTagsFrequency(problem_urls)

}


runAnalysis();