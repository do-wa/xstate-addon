export const createNode = data => ({
  group: 'nodes',
  data: {
    ...data
  }
});
export const createEdge = data => ({
  group: 'edges',
  data: {
    ...data
  }
});
export const createId = (parent, id) => `${parent ? `${parent}.` : ''}${id}`;
