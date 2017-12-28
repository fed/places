import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Alert from '.';

storiesOf('Alert', module)
  .add('success', () => (
    <Alert type="success" onClose={action('close-success-alert')}>
      Your request was successful!
    </Alert>
  ))
  .add('error', () => (
    <Alert type="error" onClose={action('close-error-alert')}>
      Oops! Something terrible happened :(
    </Alert>
  ))
  .add('info', () => (
    <Alert onClose={action('close-info-alert')}>
      Hello! I'm a regular alert message
    </Alert>
  ));
