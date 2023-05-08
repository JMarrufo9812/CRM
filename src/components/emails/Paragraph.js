import { Node } from 'tiptap';

class Paragraph extends Node {
  // eslint-disable-next-line
  get name() {
    return 'paragraph';
  }
  // eslint-disable-next-line
  get schema() {
    return {
      content: 'inline*',
      draggable: false,
      group: 'block',
      parseDOM: [
        {
          tag: 'div',
        },
      ],
      toDOM() {
        return ['div', 0];
      },
    };
  }
}

export default Paragraph;
