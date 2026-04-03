import * as React from 'react';
import constants from '../const';

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface FetchDataState {
  forecasts: WeatherForecast[];
  loading: boolean;
  currentPage: number;
}

export class FetchData extends React.Component<object, FetchDataState> {
  constructor(props: object) {
    super(props);
    this.state = { forecasts: [], loading: true, currentPage: 1 };
    this.fetchForecasts(1);
  }

  fetchForecasts(page: number) {
    this.setState({ loading: true });
    fetch(constants.FetchDataRootUrl + `startDateIndex=${page}`)
      .then((response) => response.json())
      .then((data: WeatherForecast[]) => {
        this.setState({ forecasts: data, loading: false, currentPage: page });
      });
  }

  handlePrev = () => {
    if (this.state.currentPage > 1) {
      this.fetchForecasts(this.state.currentPage - 1);
    }
  };

  handleNext = () => {
    this.fetchForecasts(this.state.currentPage + 1);
  };

  render() {
    const { loading, currentPage } = this.state;

    const contents = loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {contents}
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={this.handlePrev} disabled={loading || currentPage <= 1}>
            &laquo; Prev
          </button>
          <span>Page {currentPage}</span>
          <button onClick={this.handleNext} disabled={loading}>
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }

  static renderForecastsTable(forecasts: WeatherForecast[]) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
