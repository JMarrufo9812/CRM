<template>
  <div class="tiptap-custom-image-container">
    <vue-draggable-resizable
      class-name="resizable"
      :w="width"
      :h="height"
      @resizestop="onResize"
      :draggable="false"
      :lock-aspect-ratio="true"
      :enable-native-drag="true"
    >
      <div
        :style="
          `background-image:url('${src}');background-size:cover;background-repeat:no-repeat;position:absolute;top:0;left:0;right:0;bottom:0;`
        "
      ></div>
    </vue-draggable-resizable>
  </div>
</template>
<script>
/* eslint-disable */
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
export default {
  props: ['node', 'updateAttrs', 'view', 'selected', 'getPos', 'options'],
  components: {
    'vue-draggable-resizable': VueDraggableResizable,
  },
  computed: {
    src: {
      get() {
        return this.node.attrs.src;
      },
      set(src) {
        this.updateAttrs({ src });
      },
    },
    width: {
      get() {
        return parseInt(this.node.attrs.width);
      },
      set(width) {
        this.updateAttrs({
          width: width,
        });
      },
    },
    height: {
      get() {
        return parseInt(this.node.attrs.height);
      },
      set(height) {
        this.updateAttrs({
          height: height,
        });
      },
    },
  },
  methods: {
    onResize(x, y, width, height) {
      this.width = width;
      this.height = height;
    },
  },
};
</script>

<style scoped>
.resizable {
  position: relative;
  border: 1rem solid transparent;
}
</style>
