/* eslint-disable */
import { Node } from 'tiptap';
import { Fragment } from 'prosemirror-model';
import { replaceText } from 'tiptap-commands';

export default class Span extends Node {
  get name() {
    return 'span';
  }

  get defaultOptions() {
    return {
      variableClass: 'variable',
    };
  }

  getLabel(dom) {
    return dom.innerText;
  }

  get schema() {
    return {
      attrs: {
        id: {},
        label: {},
      },
      group: 'inline',
      inline: true,
      content: 'inline*',
      selectable: false,
      atom: true,
      toDOM: (node) => [
        'span',
        {
          class: this.options.variableClass,
          'data-variable-id': node.attrs.id,
        },
        node.attrs.label,
      ],
      parseDOM: [
        {
          tag: 'span[data-variable-id]',
          getAttrs: (dom) => {
            const id = dom.getAttribute('data-variable-id');
            const label = this.getLabel(dom);
            return { id, label };
          },
          getContent: (dom, schema) => {
            const label = this.getLabel(dom);
            return Fragment.fromJSON(schema, [
              {
                type: 'text',
                text: label,
              },
            ]);
          },
        },
      ],
    };
  }

  commands({ schema }) {
    return (attrs) => replaceText(null, schema.nodes[this.name], attrs);
  }
}
