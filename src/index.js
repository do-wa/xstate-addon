import React from "react";
import addons from "@storybook/addons";

export class WithXStateGraph extends React.Component {
  constructor(props) {
    super(props);
    const channel = addons.getChannel();
    channel.on("xstate/transition", event => {
      props.onEvent(event);
    });
  }
  render() {
    const { children, machine, currentState, render } = this.props;
    const channel = addons.getChannel();
    channel.emit("xstate/buildGraph", { machine, currentState });
    return children;
  }
}
