/* eslint-disable */
import { Extension, Plugin } from 'tiptap';

export default class MaxSize extends Extension {
  get name() {
    return 'maxSize';
  }

  get defaultOptions() {
    return {
      maxSize: null,
    };
  }

  get plugins() {
    return [
      new Plugin({
        filterTransaction: (transaction) => {
          if (!transaction.docChanged || !this.options.maxSize) {
            return true;
          }

          const size = transaction.doc && transaction.doc.textContent.length;
          const maxSizeReached = size > this.options.maxSize;
          return !maxSizeReached;
        },
      }),
    ];
  }
}
