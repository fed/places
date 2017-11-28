import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from '.';

storiesOf('Form', module)
  .add('success', () => (
    <Form onSubmit={action('form-submit')} />
  ));
