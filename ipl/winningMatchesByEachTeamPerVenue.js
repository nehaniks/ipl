function winningMatchesByEachTeamPerVenue(matches) {
    // Story matches won by each team per venue

    let result = [];
    // Retrieve array of teams and seasons
    let teams = [...new Set(matches.map(item => item.winner))];
    teams.push('');
    let venues = [...new Set(matches.map(item => item.venue).sort())];

    let matchesWon = [];
    for (let i = 0; i < teams.length; i++) {
        // Retrieve venue's match won by each team and count the occurence and convert into object
        matchesWon.push(matches.filter(item => item.winner === teams[i].toString()).map(element => element.venue));
        matchesWon[i] = matchesWon[i].reduce(function (acc, curr) {
            if (typeof acc[curr] === 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
            return acc;
        }, {});

        // Append the venue in which no matches were won
        for (let j = 0; j < venues.length; j++) {
            if (!(matchesWon[i].hasOwnProperty(venues[j]))) {
                matchesWon[i][venues[j]] = 0;
            }
        }
        // Sort the object in alphabetical order of venues
        const ordered = {};
        Object.keys(matchesWon[i]).sort().forEach(function (key) {
            ordered[key] = matchesWon[i][key];
        });

        // Change object key of matches with no result from '' to noResult and push the obje ct to result array
        let resultObject = {};
        if (teams[i] === '')
            resultObject["noResult"] = ordered;
        else
            resultObject[teams[i]] = ordered;

        result.push(resultObject);

    }

    return result;
}

module.exports = winningMatchesByEachTeamPerVenue;