import React, { Component } from 'react';
import { bootstrap, hideAlert } from '../../state/actions';
import Spinner from '../Spinner';
import Alert from '../Alert';
import Form from '../Form';
import type {Store} from '../../state/types';
import './styles.css';

type Props = Store;

class App extends Component<Props> {
  componentWillMount() {
    bootstrap();
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={place => console.log(place)} />

        <Spinner isVisible={this.props.loading} />

        <ul className="App__alerts">
          {
            this.props.alerts.map((alert, index) => (
              <li className="App__alert" key={index}>
                <Alert type={alert.type} onClose={() => hideAlert(alert.id)}>
                  {alert.message}
                </Alert>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
