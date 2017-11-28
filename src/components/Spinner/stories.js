import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '.';

storiesOf('Loading Spinner', module)
  .add('default', () => (
    <Spinner isVisible />
  ));
