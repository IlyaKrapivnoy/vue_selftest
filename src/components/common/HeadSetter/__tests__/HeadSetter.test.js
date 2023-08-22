import { mount } from "@vue/test-utils";
import HeadSetter from "@/components/common/HeadSetter/HeadSetter.vue";
import { useHead } from "@unhead/vue";

jest.mock("@unhead/vue", () => ({
  useHead: jest.fn(),
}));

describe("HeadSetter", () => {
  it("updates head using provided props", () => {
    const title = "Page Title";
    const name = "description";
    const content = "This is the page description";

    const wrapper = mount(HeadSetter, {
      props: { title, name, content },
    });

    expect(useHead).toHaveBeenCalledWith({
      title: title,
      meta: [{ name: name, content: content }],
    });
  });

  it("renders nothing in the DOM", () => {
    const wrapper = mount(HeadSetter);

    expect(wrapper.html()).toBe("");
  });

  it("renders nothing in the DOM when props are empty", () => {
    const wrapper = mount(HeadSetter, {
      props: { title: "", name: "", content: "" },
    });

    expect(wrapper.html()).toBe("");
  });

  it("calls useHead with provided props", () => {
    const title = "Page Title";
    const name = "description";
    const content = "This is the page description";

    mount(HeadSetter, {
      props: { title, name, content },
    });

    expect(useHead).toHaveBeenCalledWith({
      title: title,
      meta: [{ name: name, content: content }],
    });
  });
});
