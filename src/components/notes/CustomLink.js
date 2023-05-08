import { Link } from 'tiptap-vuetify';

export class CustomLink extends Link {
  constructor(props) {
    super({ ...props });
    this.target = '_blank';
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null,
        },
        target: {
          default: '_blank',
        },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: (dom) => ({
            href: dom.getAttribute('href'),
            target: dom.getAttribute('target'),
          }),
        },
      ],
      toDOM: (node) => [
        'a',
        {
          ...node.attrs,
          target: this.target,
        },
        0,
      ],
    };
  }
}
