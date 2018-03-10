import React from 'react';
import PropTypes from 'prop-types';
import SummaryRow from '../player-summary/summary-row';

function SummaryTable(props) {
  const rows = [];

  for (let i = 1; i <= 16; i += 1) {
    const key = `${i}${props.playerid}`;
    rows.push(<SummaryRow key={key} playerid={props.playerid} week={i} />);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Week</th>
          <th>Date</th>
          <th>Opponent</th>
          <th>Game Score</th>
          <th>Fantasy Points</th>
          <th>Attempts</th>
          <th>Completions</th>
          <th>Yards</th>
          <th>Touchdowns</th>
          <th>Interceptions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="10">Passing</td>
        </tr>
        {rows}
      </tbody>
    </table>
  );
}

export default SummaryTable;

SummaryTable.propTypes = {
  playerid: PropTypes.number.isRequired,
};
