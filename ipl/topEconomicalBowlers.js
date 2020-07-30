function topEconomicalBowlers(matches, deliveries) {
    // Top economical bowlers in 2015 season

    let result = {};
    let balls = {};
    // Get the match ID that belong to season 2015 from matches data
    let matchId = matches.filter(item => {
        if (item.season === '2015')
            return item.id
    }).map(item => item.id);

    for (let delivery of deliveries) {
        const match_Id = delivery.match_id;
        // If the match ID of deliveries data belongs to season 2015
        if (matchId.includes(match_Id)) {
            const bowler = delivery.bowler;
            const totalRuns = Number(delivery.total_runs);
            const wideRuns = Number(delivery.wide_runs);
            const legbyeRuns = Number(delivery.legbye_runs);
            const noBallRuns = Number(delivery.noball_runs);
            // If result object  or balls object has delivery bowler as key add the total runs and balls else add the key with total runs and ball
            if (balls[bowler] || result[bowler]) {
                result[bowler] += totalRuns;
                if (wideRuns === 0 && legbyeRuns === 0 && noBallRuns === 0)
                    balls[bowler] += 1;
                else
                    balls[bowler] += 0;
            } else {
                result[bowler] = totalRuns;
                if (wideRuns < 1 && legbyeRuns < 1 && noBallRuns < 1)
                    balls[bowler] = 1;
                else
                    balls[bowler] = 0;
            }

        }
    }  
    // Calculate the economy rate of bowler by dividing total runs given by total number of overs
    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            result[key] = Number((result[key] / Number((balls[key] / 6).toFixed(2))).toFixed(2));
        }
    }
    // Sort the result for top 10 economy bowlers
    let entries = Object.entries(result);
    result = entries.sort((a, b) => a[1] - b[1]);
    result = result.splice(0, 10);
    return result;
}

module.exports = topEconomicalBowlers;
