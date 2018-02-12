import React from "react";
import addons from "@storybook/addons";

export default class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machine: props.machine,
      currentState: props.machine.initial
    };
    this.onEvent = this.onEvent.bind(this);
  }
  shouldComponentUpdate(nextProp, nextState) {
    return nextState.currentState !== this.state.currentState;
  }
  onEvent(next) {
    this.setState({
      machine: this.state.machine,
      currentState: this.state.machine.transition(this.state.currentState, next)
        .value
    });
  }
  render() {
    const { render } = this.props;
    const { machine, currentState } = this.state;
    const onEvent = this.onEvent;
    return render({ machine, currentState, onEvent });
  }
}
