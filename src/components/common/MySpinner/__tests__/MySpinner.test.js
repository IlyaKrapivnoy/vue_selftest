import { mount } from "@vue/test-utils";
import MySpinner from "@/components/common/MySpinner/MySpinner.vue";

describe("MySpinner", () => {
  const getWrapper = (props = {}) => mount(MySpinner, { props });

  it("matches snapshot", () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the spinner element", () => {
    const wrapper = getWrapper();
    const spinner = wrapper.find(".animate-spin");
    expect(spinner.exists()).toBe(true);
  });

  it("applies the provided CSS class to the wrapper div", () => {
    const wrapper = getWrapper({ wrapperClass: "my-custom-class" });
    expect(wrapper.classes()).toContain("my-custom-class");
  });

  it("renders with the correct component name", () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.$options.name).toBe("MySpinner");
  });

  it("has a default prop for wrapperClass", () => {
    const wrapper = getWrapper();
    expect(wrapper.props("wrapperClass")).toBe("");
  });
});
