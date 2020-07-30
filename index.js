const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const winningMatchesPerTeam = require("./ipl/winningMatchesPerTeam");
const extraRunsByEachTeam = require("./ipl/extraRunsByEachTeam");
const topEconomicalBowlers = require("./ipl/topEconomicalBowlers");
const winningMatchesByEachTeamPerVenue = require("./ipl/winningMatchesByEachTeamPerVenue");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
let result = {};

function main() {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deliveries => {
                    result.matchesPlayedPerYear = matchesPlayedPerYear(matches);
                    result.winningMatchesPerTeam = winningMatchesPerTeam(matches);
                    result.extraRunsByEachTeam = extraRunsByEachTeam(matches, deliveries);
                    result.topEconomicalBowlers = topEconomicalBowlers(matches, deliveries);
                    result.winningMatchesByEachTeamPerVenue = winningMatchesByEachTeamPerVenue(matches);
                    saveOutputData(result);
                });            
        });
}

function saveOutputData(result) {
    const jsonString = JSON.stringify(result);

    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

main();
