import { LexoRank } from 'lexorank';

export const lexoRankMixin = {
  data() {
    return {
      initOrder: '0|000000',
    };
  },
  methods: {
    // Update order
    updateOrder(indexTo, oldIndex, listOrdered) {
      const lenghtList = listOrdered.length - 1;
      // console.log('indexTo', indexTo);
      // console.log('oldIndex', oldIndex);
      if (lenghtList > indexTo) {
        if (indexTo === 0) {
          // console.log('First');
          // Here First
          const indexAfter = listOrdered[0].order;
          // Add in the first element
          return this.getPreviousOrder(indexAfter);
        }
        // Check if is up to down or down to up
        if (oldIndex > indexTo) {
          // console.log('Mayor que');

          const indexBefore = listOrdered[indexTo - 1].order;
          const indexAfter = listOrdered[indexTo].order;
          return this.getBetween(indexBefore, indexAfter);
        }
        if (oldIndex < indexTo) {
          // console.log('Menor que');

          const indexBefore = listOrdered[indexTo].order;
          // console.log('Before', listOrdered[indexTo]);
          const indexAfter = listOrdered[indexTo + 1].order;
          // console.log('After', listOrdered[indexTo + 1]);
          return this.getBetween(indexBefore, indexAfter);
        }
      }
      // Add in the end
      if (lenghtList === indexTo) {
        // console.log('Final');

        const indexBefore = listOrdered[indexTo].order;
        return this.getNextOrder(indexBefore);
      }

      return 0;
    },
    // Create a new order.
    createNewOrder(listOrdered) {
      if (listOrdered.length === 0) return this.getFirstOrder();
      // console.log('listOrdered', listOrdered);
      // console.log('listOrdered.slice(-1)', listOrdered.slice(-1));
      return this.getNextOrder(listOrdered.slice(-1)[0].order);
    },
    getParseOrder(value) {
      return LexoRank.parse(value);
    },
    getFirstOrder() {
      // console.log('GEt first');
      // console.log('number', this.initOrder);
      return this.getParseOrder(this.initOrder)
        .genNext()
        .toString();
    },
    getPreviousOrder(valueCurrent) {
      return this.getParseOrder(valueCurrent)
        .genPrev()
        .toString();
    },
    getNextOrder(valueCurrent) {
      // console.log('GEt next');
      return this.getParseOrder(valueCurrent)
        .genNext()
        .toString();
    },
    getBetween(valueCurrent, valueNext) {
      return this.getParseOrder(valueCurrent)
        .between(this.getParseOrder(valueNext))
        .toString();
    },
  },
};
