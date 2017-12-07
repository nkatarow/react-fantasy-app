import React from 'react';
import PropTypes from 'prop-types';
import SummaryRow from '../summary-table/summary-row';

const SummaryTable = ({ playerid }) => (
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
      <SummaryRow playerid={playerid} week={1} />
      <SummaryRow playerid={playerid} week={2} />
    </tbody>
  </table>
);

export default SummaryTable;

SummaryTable.propTypes = {
  playerid: PropTypes.number.isRequired,
};
