import React from 'react';
import addons from '@storybook/addons';
import debounce from 'lodash.debounce';

export class WithXStateGraph extends React.Component {
  constructor(props) {
    super(props);
    const channel = addons.getChannel();

    this.onTransition = this.onTransition.bind(this);
    this.resizeEmitter = debounce(evt => {
      if (evt.key === 'panelSizes') {
        channel.emit('xstate/resize');
      }
    }, 100);

    channel.on('xstate/transition', this.onTransition);
    window.addEventListener('storage', this.resizeEmitter, false);
  }
  onTransition(nextState) {
    this.props.onTransition(nextState);
  }
  componentWillUnmount() {
    const channel = addons.getChannel();
    window.removeEventListener('storage', this.resizeEmitter, false);
    channel.removeListener('xstate/transition', this.onTransition);
  }
  render() {
    const { children, machine, currentState } = this.props;
    const channel = addons.getChannel();
    channel.emit('xstate/buildGraph', { machine, currentState });
    return children;
  }
}
