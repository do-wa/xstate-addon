import React from 'react';
import { Machine } from 'xstate';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { WithXStateGraph } from '../src/';

import { Button, Welcome } from '@storybook/react/demo';
import TrafficLight from './TrafficLight';
import StateProvider from './StateProvider';

const lightMachine = Machine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow'
      }
    },
    yellow: {
      on: {
        TIMER: 'red'
      }
    },
    red: {
      on: {
        TIMER: 'green'
      },
      initial: 'walk',
      states: {
        walk: {
          on: {
            PED_TIMER: 'wait'
          }
        },
        wait: {
          on: {
            PED_TIMER: 'stop'
          }
        },
        stop: {}
      }
    }
  }
});

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('LightMachine', module).add('Example', () => {
  return (
    <StateProvider
      machine={lightMachine}
      render={({ currentState, machine, onEvent }) => (
        <div>
          {JSON.stringify(currentState)}
          <WithXStateGraph
            machine={lightMachine}
            onTransition={onEvent}
            currentState={currentState}
          >
            <TrafficLight light={currentState} />
          </WithXStateGraph>
        </div>
      )}
    />
  );
});
