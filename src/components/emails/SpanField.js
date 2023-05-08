/* eslint-disable */
import { Node } from 'tiptap';
import { wrappingInputRule, toggleWrap } from 'tiptap-commands';
import { Fragment } from 'prosemirror-model';

export default class SpanField extends Node {
  get name() {
    return 'spanField';
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
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: false,
      atom: true,
      editable: true,
      toDOM: (node) => {
        console.log('NODE', node);
        return [
          'span',
          {
            class: this.options.variableClass,
            'data-variable-id': node.attrs.id,
          },
          node.attrs.label,
        ];
      },
      parseDOM: [
        {
          tag: 'span[data-variable-id]',
          getAttrs: (dom) => {
            console.log('DOM', dom);
            const id = dom.getAttribute('data-variable-id');
            const label = this.getLabel(dom);
            return { id, label };
          },
        },
      ],
    };
  }

  commands({ type }) {
    return (attrs) => toggleWrap(type, attrs);
  }

  keys({ type }) {
    return {
      'Ctrl->': toggleWrap(type),
    };
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*>\s$/, type)];
  }
}
