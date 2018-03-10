import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SummaryRow extends Component {
  static propTypes = {
    playerid: PropTypes.number.isRequired,
    week: PropTypes.number.isRequired,
  }

  state = {
    stats: {},
  }

  async componentDidMount() {
    const TEST_DATA = true;
    let result;

    try {
      if (TEST_DATA) {
        result = await fetch(`/data/players/2593-week${this.props.week}.json`);
      } else {
        result = await fetch(`https://api.fantasydata.net/v3/nfl/stats/JSON/PlayerGameStatsByPlayerID/2016/${this.props.week}/${this.props.playerid}`, {
          headers: { 'Ocp-Apim-Subscription-Key': 'bd237b0dc9074a3f9318d38be3c0d501' },
        });
      }
      const stats = await result.json();
      this.setState({
        stats,
      });
    } catch (e) {
      this.setState({
        stats: {
          GameDate: '-',
          Opponent: '-',
          GameScore: '-',
          FantasyPointsYahoo: '-',
          PassingAttempts: '-',
          PassingCompletions: '-',
          PassingYards: '-',
          PassingTouchdowns: '-',
          PassingInterceptions: '-',
        },
      });
    }
  }

  render() {
    const { stats } = this.state;

    return (
      <tr>
        <td>{this.props.week}</td>
        <td>{stats.GameDate}</td>
        <td>{stats.Opponent}</td>
        <td>{stats.GameScore}</td>
        <td>{stats.FantasyPointsYahoo}</td>
        <td>{stats.PassingAttempts}</td>
        <td>{stats.PassingCompletions}</td>
        <td>{stats.PassingYards}</td>
        <td>{stats.PassingTouchdowns}</td>
        <td>{stats.PassingInterceptions}</td>
      </tr>
    );
  }
}
