import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Alert from '.';

storiesOf('Alert', module)
  .add('success', () => (
    <Alert type="success" onClose={action('close-alert')}>
      Your request was successful!
    </Alert>
  ))
  .add('error', () => (
    <Alert type="success" onClose={action('close-alert')}>
      Oops! Something terrible happened :(
    </Alert>
  ))
  .add('info', () => (
    <Alert onClose={action('close-alert')}>
      Hello! I'm an alert message
    </Alert>
  ));
