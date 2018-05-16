import { getNodes } from 'xstate/lib/graph';
import { getActionType } from 'xstate/lib/utils';
const getEdges = node => {
  const edges = [];
  if (node.states) {
    Object.keys(node.states).forEach(stateKey => {
      edges.push(...getEdges(node.states[stateKey]));
    });
  }

  Object.keys(node.on || {}).forEach(event => {
    edges.push(...getEventNodes(node, event));
  });
  return edges;
};

const getEventNodes = (node, event) => {
  const transitions = node.on[event] || [];

  return transitions.map(transition => {
    return {
      group: 'edges',
      data: {
        id: `${node.key}${event}`,
        source: node.key,
        target: transition.target,
        key: event,

        actions: transition.actions
          ? getActionType(transition.actions.map(getActionType))
          : []
      }
    };
  });
};

const createInitialNodes = (node, parent = '') => {
  let newNodes = [];
  if (node.initial) {
    newNodes.push({
      group: 'nodes',
      data: {
        id: `${node.key}.initial`,
        parent,
        isInitial: true
      }
    });
    newNodes.push({
      group: 'edges',
      data: {
        isInitial: true,
        id: `${node.key}.initial.edge`,
        source: `${node.key}.initial`,
        target: `${node.initial}`,
        parent
      }
    });
  }
  return newNodes;
};

export const build = (machine, currentState) => {
  const nodes = getNodes(machine);
  const graphNodes = nodes.reduce((acc, node, idx) => {
    const { path, key } = node;
    let parent = path.length > 1 ? path[path.length - 2] : '';
    acc.push(...createInitialNodes(node, node.key));
    acc.push(...getEdges(node));
    acc.push({
      group: 'nodes',
      data: {
        path,
        id: key,
        key,
        parent,
        hasChildren: Object.keys(node.states).length
      }
    });
    return acc;
  }, []);
  graphNodes.push(...createInitialNodes({ initial: machine.initial, key: '' }));
  return graphNodes;
};
