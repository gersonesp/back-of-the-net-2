export const generateTable = (allMatches, teamsArray) => {
  let tableObject = {};

  teamsArray.map(
    (teamId) =>
      (tableObject[teamId] = {
        teamId,
        win: 0,
        lose: 0,
        draw: 0,
        total: 0,
        played: 0,
        goals: 0,
      })
  );

  if (tableObject.hasOwnProperty(1)) {
    // eslint-disable-next-line
    allMatches.map((match) => {
      const homeTeamId = match.team_h;
      const homeTeamScore = match.team_h_score;
      const awayTeamId = match.team_a;
      const awayTeamScore = match.team_a_score;

      if (match.minutes === 90) {
        if (homeTeamScore > awayTeamScore) {
          tableObject[homeTeamId].win++;
          tableObject[homeTeamId].total += 3;
          tableObject[awayTeamId].lose++;
        } else if (homeTeamScore < awayTeamScore) {
          tableObject[awayTeamId].win++;
          tableObject[awayTeamId].total += 3;
          tableObject[homeTeamId].lose++;
        } else {
          tableObject[homeTeamId].draw++;
          tableObject[homeTeamId].total += 1;
          tableObject[awayTeamId].draw++;
          tableObject[awayTeamId].total += 1;
        }

        tableObject[homeTeamId].played++;
        tableObject[awayTeamId].played++;
        tableObject[homeTeamId].goals += homeTeamScore;
        tableObject[awayTeamId].goals += awayTeamScore;
      }
    });
  }

  const tableArray = Object.values(tableObject).sort((a, b) => {
    return b.total - a.total || b.second - a.second;
  });

  return tableArray;
};
