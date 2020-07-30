function getExtraRunsForSeason(matches, deliveries, season) {
    let seasonResult = {};

    // Get the match ID that belong to season 2016 from matches data
    let matchId = matches.filter(item => {
        if (item.season === season)
            return item.id
    }).map(item => item.id);

    for (let delivery of deliveries) {
        const match_Id = delivery.match_id;
        const team = delivery.bowling_team;
        const extra_runs = Number(delivery.extra_runs);
        // If the match ID of deliveries data belongs to season 2016
        if (matchId.includes(match_Id)) {
            // If result object has delivery team as key add the extra runs else add the key with extra runs
            if (seasonResult[team]) {
                seasonResult[team] += extra_runs;
            } else {
                seasonResult[team] = extra_runs;
            }
        }
    }
    return seasonResult;
}

function extraRunsByEachTeam(matches, deliveries) {
    // Extra runs conceded by each team

    let result = [];
    let seasons = [...new Set(matches.map(item => item.season).sort())];
    //console.log(seasons);

    for (let i = 0; i < seasons.length; i++) {
        let seasonResult = {};
        seasonResult[seasons[i]] = getExtraRunsForSeason(matches, deliveries, seasons[i]);
        result.push(seasonResult);
    }

    let s = 2014;
    s = s.toString();
    const winningTeams = [];
    

    for (let items in result) {
        for (let elem in result[items]) {
            if (elem === s) {
                for (let team in result[items][elem])
                    winningTeams.push([team, result[items][elem][team]]);
            }
        }
    }

    return result;
}

module.exports = extraRunsByEachTeam;
