function winningMatchesPerTeam(matches) {
    // Number of matches won by each team over all the years of IPL
    
    let result = [];
    
    // Retrieve array of teams and seasons
    let teams = [...new Set(matches.map(item => item.team1))];
    teams.push('');
    let seasons = [...new Set(matches.map(item => item.season).sort())];

    let matchesWon = [];
    
    for (let i = 0; i < teams.length; i++) {
        // Retrieve seasons won by each team and count the occurence and convert into object
        matchesWon.push(matches.filter(item => item.winner === teams[i].toString()).map(element => element.season));
        matchesWon[i] = matchesWon[i].reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
            return acc;
        }, {});

        // Append the seasons in which no matches were won
        for ( let j = 0; j < seasons.length; j++ ) {
            if ( !(matchesWon[i].hasOwnProperty(seasons[j])) ) {
                matchesWon[i][seasons[j]] = 0;
            }
        }
        // Sort the object in increasing order of seasons
        const ordered = {};
        Object.keys(matchesWon[i]).sort().forEach(function (key) {
            ordered[key] = matchesWon[i][key];
        });

        // Change object key of matches with no result from '' to noResult and push the obje ct to result array
        let resultObject = {};
        if ( teams[i] === '' ) 
            resultObject["noResult"] = matchesWon[i];
        else
            resultObject[teams[i]] = matchesWon[i];

        result.push(resultObject);

    }
    
    return result;
}

module.exports = winningMatchesPerTeam;
