<script>
import { useHead } from "@unhead/vue";

export default {
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
