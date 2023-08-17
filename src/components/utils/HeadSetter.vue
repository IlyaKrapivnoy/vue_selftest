<script>
import { useHead } from "@unhead/vue";

export default {
  render() {
    return null;
  },
  props: {
    title: String,
    name: String,
    content: String,
  },
  setup(props) {
    useHead({
      title: props.title,
      meta: [
        {
          name: props.name,
          content: props.content,
        },
      ],
    });
  },
};
</script>
