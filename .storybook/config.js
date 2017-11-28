// Import global styles (css reset, typography, etc.)
import '../src/index.css';

// Load stories from each component's folder
import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
