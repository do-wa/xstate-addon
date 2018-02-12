import React from "react";
import addons from "@storybook/addons";

import { convertToPlantUML } from "../xstate-plantuml";
import plantumlEncoder from "plantuml-encoder";
import jsonFile from "../xstate-plantuml/on-off.json";

const styles = {
  notesPanel: {
    margin: 10,
    fontFamily: "Arial",
    fontSize: 14,
    color: "#444",
    width: "100%",
    overflow: "auto"
  }
};

class Notes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { text: "" };
    this.onAddNotes = this.onAddNotes.bind(this);
    debugger;
    this.plantumlSrc = convertToPlantUML("", jsonFile);
    var decode = plantumlEncoder.encode(this.plantumlSrc);
    var url = "http://www.plantuml.com/plantuml/img/" + decode;
  }

  onAddNotes(text) {
    this.setState({ text });
  }

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the notes and render it.
    channel.on("kadira/notes/add_notes", this.onAddNotes);

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddNotes("");
    });
  }

  render() {
    const { text } = this.state;
    const textAfterFormatted = text ? text.trim().replace(/\n/g, "<br />") : "";
    const plantuml = this.plantumlSrc;
    return (
      <div style={styles.notesPanel}>
        {<div dangerouslySetInnerHTML={{ __html: plantuml }} />}
      </div>
    );
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel, api } = this.props;
    channel.removeListener("kadira/notes/add_notes", this.onAddNotes);
  }
}

// Register the addon with a unique name.
addons.register("kadira/notes", api => {
  debugger;
  // Also need to set a unique name to the panel.
  addons.addPanel("kadira/notes/panel", {
    title: "Notes",
    render: () => <Notes channel={addons.getChannel()} api={api} />
  });
});
