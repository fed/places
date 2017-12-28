import React from 'react';
import Form from '../Form';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <Form onSubmit={console.log} />

      {/* <Spinner isVisible={this.props.loading} />

      <ul className="App__alerts">
        {this.props.alerts.map((alert, index) => (
          <li className="App__alert" key={index}>
            <Alert type={alert.type} onClose={() => hideAlert(alert.id)}>
              {alert.message}
            </Alert>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
