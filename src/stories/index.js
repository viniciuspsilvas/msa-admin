import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SearchBox from '../components/SearchBox';

storiesOf('Button', module)
  .add('with text', () => 
    <SearchBox />
  );
