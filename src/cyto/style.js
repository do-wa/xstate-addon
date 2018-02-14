const style = [
  {
    selector: 'node',
    style: {
      padding: "20px",
      "text-valign": ele => (ele.data("hasChildren") ? "top" : "center"),
      "text-halign": "center",
      "background-color": "white",
      "border-color": ele => {
        return ele.data("selected")
          ? "red"
          : ele.data("isInitial") ? "white" : "black";
      },
      "border-width": 1,
      shape: ele => (ele.data("isInitial") ? "ellipse" : "roundrectangle"),
      label: "data(key)"
    }
  },
  {
    selector: 'edge',
    style: {
      width: 1,
      "line-color": "black",
      "text-background-opacity": 1,
      "text-background-color": "#ffffff",
      "target-arrow-color": "black",
      "target-arrow-shape": "triangle",
      "source-arrow-color": "black",
      "source-arrow-shape": ele => (ele.data("isInitial") ? "circle" : "none"),
      "curve-style": ele =>
        ele.data("isInitial") ? "unbundled-bezier" : "bezier",

      label: 'data(key)'
    }
  }
];

export default style;
