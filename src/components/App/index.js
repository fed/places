// @flow
import React from 'react';
import Alert from '../Alert';
import Spinner from '../Spinner';
import Form from '../Form';
import { hideAlert, requestPlaces, addPlace } from '../../state/actions';
import type { Store } from '../../state/types';
import './styles.css';

type Props = Store;

export default class App extends React.Component<Props> {
  componentWillMount() {
    // Bootstrap the application state by fetching all places.
    requestPlaces();
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={addPlace} />

        <Spinner isVisible={this.props.loading} />

        <ul className="App__alerts">
          {this.props.alerts.map((alert, index) => (
            <li className="App__alert" key={index}>
              <Alert type={alert.type} onClose={() => hideAlert(alert.id)}>
                {alert.message}
              </Alert>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
