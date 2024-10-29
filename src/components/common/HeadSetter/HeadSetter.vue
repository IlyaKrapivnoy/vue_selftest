<script>
import { useHead } from "@unhead/vue";

export default {
  render() {
    return null;
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "description",
    },
    content: {
      type: String,
      required: true,
    },
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
