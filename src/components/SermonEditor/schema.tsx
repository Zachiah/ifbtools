import { Schema } from 'prosemirror-model';
import ReactDOM from 'react-dom';
import Verse from "components/Verse";
import theBible from 'util/Bible';

const schema = new Schema({
  nodes: {
    // a text node
    text: {},
    // a top-level doc node, which can contain at least one paragraph
    doc: {
      content: 'block+',
    },
    // a paragraph node, which can contain some text nodes, represented in HTML as `<p>`
    paragraph: {
      content: 'text*',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
      group: 'block'
    },

    heading: {
      attrs: {
        level: { default: 1 },
      },
      group: 'block heading',
      content: 'text*',
      marks: 'emphasis',
      defining: true,
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
      toDOM: (node) => [`h${String(node.attrs.level)}`, 0],
    },

    verse: {
      group: 'block',
      content: 'text*',
      attrs: {
        verse: {}
      },
      toDOM: (node) => {
        let dom = document.createElement("div");
        ReactDOM.render(<Verse active={false} verse={node.attrs.verse} />, dom);
        return dom;
      }
    }
  },
  marks: {
    // a strong mark, represented in HTML as `<strong>`
    strong: {
      parseDOM: [{ tag: 'strong' }],
      toDOM: () => ['strong', 0],
    },
    // an emphasis mark, represented in HTML as `<em>`
    emphasis: {
      parseDOM: [{ tag: 'em' }],
      toDOM: () => ['em', 0],
    }
  }
});

export default schema;