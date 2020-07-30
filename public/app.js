function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

document.getElementById("submit").addEventListener("click", onSubmit);
function onSubmit() {
  console.log("Submitted");
  var season = Number(document.getElementById("season").value);
  if (season < 2008 || season > 2019) {
    document.getElementById("error").hidden = false;
  } else {
    console.log("Correct input");
    //visualizeExtraRunsByEachTeam(data);
  }
  fetch(`/json?year=${season}`)
    .then(res => res.json())
    .then(data => visualizeExtraRunsByEachTeam(data));
}

function visualizeData(data) {
  //visualizeExtraRunsByEachTeam(data.extraRunsByEachTeam);
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeWinningMatchesPerTeam(data.winningMatchesPerTeam);
  visualizeTopEconomicalBowlers(data.topEconomicalBowlers);
  visualizeWinningMatchesByEachTeamPerVenue(data.winningMatchesByEachTeamPerVenue);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];

  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Total number of matches played each year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "14px"
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      },
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Teams",
        data: seriesData,
        dataLabels: {
          enabled: true,
          align: "center",
          y: 25
        }
      }
    ]
  });
}

function visualizeWinningMatchesPerTeam(winningMatchesPerTeam) {
  const winningTeams = [];
  const result = [];

  for (let items in winningMatchesPerTeam) {
    for (let elem in winningMatchesPerTeam[items]) {
      winningTeams.push([elem, winningMatchesPerTeam[items][elem]]);
    }
  }

  for (let i = 0; i < winningTeams.length; i++) {
    let obj = {};
    obj.name = winningTeams[i][0];
    obj.data = Object.values(winningTeams[i][1]);
    result.push(obj);
  }

  const years = Object.keys(winningTeams[0][1]);
  console.log(years);
  console.log(result);

  Highcharts.chart('winning-matches-per-team', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Number of matches won by each team over all the years of IPL'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: years,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Matches won'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: result
  });
}

function visualizeExtraRunsByEachTeam(extraRunsByEachTeam) {
  console.log(extraRunsByEachTeam["data"]);
  const result = [];

  for (let team in extraRunsByEachTeam["data"]) {
    result.push([team, extraRunsByEachTeam["data"][team]]);
  }
  
  console.log(result);

  Highcharts.chart("extra-runs-by-each-team", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra runs conceded by each team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "14px"
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      },
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Teams",
        data: result,
        dataLabels: {
          enabled: true,
          align: "center",
          y: 25
        }
      }
    ]
  });
}

function visualizeTopEconomicalBowlers(topEconomicalBowlers) {
  const data = [];

  for (let bowler in topEconomicalBowlers) {
    data.push(topEconomicalBowlers[bowler]);
  }
  console.log(data);

  Highcharts.chart("top-economical-bowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: "Top economical bowlers in 2015 season"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "14px"
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      },
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Bowlers",
        data: data,
        dataLabels: {
          enabled: true,
          align: "center",
          y: 25
        }
      }
    ]
  });
}

function visualizeWinningMatchesByEachTeamPerVenue(winningMatchesByEachTeamPerVenue) {
  const winningTeams = [];
  const result = [];

  for (let items in winningMatchesByEachTeamPerVenue) {
    for (let elem in winningMatchesByEachTeamPerVenue[items]) {
      winningTeams.push([elem, winningMatchesByEachTeamPerVenue[items][elem]]);
    }
  }

  for (let i = 0; i < winningTeams.length; i++) {
    let obj = {};
    obj.name = winningTeams[i][0];
    obj.data = Object.values(winningTeams[i][1]);
    result.push(obj);
  }

  const venues = Object.keys(winningTeams[0][1]);
  console.log(venues);

  Highcharts.chart("winning-matches-by-each-team-per-year", {
    chart: {
      type: "bar"
    },
    title: {
      text: "Story matches won by each team per venue"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      categories: venues
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Matches'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: result
  });
}