import { Node } from "tiptap";

export default class Title extends Node {
  get name() {
    return "title";
  }

  get schema() {
    return {
      content: "inline*",
      // define how the editor detects your node form parsed HTML
      parseDOM: [
        {
          tag: "h1"
        }
      ],
      // this is how this node will be rendered
      toDOM: () => ["h1", { class: "title" }, 0]
    };
  }
}
