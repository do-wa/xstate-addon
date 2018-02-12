import React from "react";
import addons from "@storybook/addons";
import style from "./cyto/style";

import { render } from "./cyto";
import { build } from "./graphBuilder/statechart";

const styles = {
  cy: {
    height: "100%",
    width: "100%"
  }
};

class XStateGraph extends React.Component {
  constructor(...args) {
    super(...args);
    this.buildGraph = this.buildGraph.bind(this);
    this.machine = { id: "" };
  }

  buildGraph({ machine, currentState, forceRender = false }) {
    if (this.cNode && machine.id) {
      if (this.machine.id !== machine.id || forceRender) {
        this.machine = machine;
        this.currentState = currentState;
        this.graph = render(
          this.cNode,
          build(machine.states, machine.initial, null, currentState),
          event => {
            const { channel } = this.props;
            channel.emit("xstate/transition", event);
          }
        );
      } else {
        this.graph.setState(currentState);
      }
    }
  }
  componentDidUpdate() {
    this.buildGraph({
      machine: this.machine,
      currentState: this.currentState,
      forceRender: true
    });
  }
  componentDidMount() {
    const { channel, api } = this.props;
    channel.on("xstate/buildGraph", this.buildGraph);
    this.stopListeningOnStory = api.onStory(() => {
      this.buildGraph({ machine: {}, currentState: "" });
    });
  }

  render() {
    return <div style={styles.cy} id="cy" ref={el => (this.cNode = el)} />;
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel, api } = this.props;
    channel.removeListener("xstate/buildGraph", this.buildGraph);
  }
}

addons.register("xstate/machine", api => {
  addons.addPanel("xstate/machine/graph", {
    title: "xstate",
    render: () => <XStateGraph channel={addons.getChannel()} api={api} />
  });
});
