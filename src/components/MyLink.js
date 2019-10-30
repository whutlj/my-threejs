export default {
  name: 'MyLink',
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  render(h) {
    console.log(this.to,this.tag);
    const data = {
      attrs: {
        href: this.to
      }
    };
    return h(this.tag, data, this.$slots.default);
  }
};
