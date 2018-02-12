const R = require("ramda");
import { createNode, createEdge, createId } from "./utils";

export const build = (
  states,
  initial,
  parent = "",
  currentState,
  initialSet = false
) =>
  R.flatten(
    R.reduce(
      (acc, stateKey) => {
        const state = states[stateKey];
        const childNodes = R.has("states", state)
          ? build(state.states, state.initial, stateKey, currentState, false)
          : [];
        const edges = R.map(
          edgeKey =>
            createEdge({
              id: createId(stateKey, edgeKey),
              key: edgeKey,
              parent,
              source: state.relativeId,
              target: createId(parent, state.on[edgeKey])
            }),
          R.keysIn(state.on)
        );
        const node = createNode({
          key: stateKey,
          id: state.relativeId,
          parent,
          selected: state.relativeId === currentState ? true : false,
          hasChildren: childNodes.length ? true : false
        });
        if (!initialSet) {
          const initialNode = createNode({
            id: createId(parent, "initial"),
            isInitial: true,
            parent
          });
          const initialEdge = createEdge({
            id: createId(parent, "initial.edge"),
            source: initialNode.data.id,
            target: createId(parent, initial),
            isInitial: true,
            parent
          });
          initialSet = true;
          acc = [initialNode, initialEdge, ...acc];
        }
        acc = [node, ...edges, ...childNodes, ...acc];
        return acc;
      },
      [],
      R.keysIn(states)
    )
  );
