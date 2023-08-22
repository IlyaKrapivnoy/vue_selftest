import { mount } from "@vue/test-utils";
import MySpinner from "@/components/common/MySpinner/MySpinner.vue";

describe("MySpinner", () => {
  it("matches snapshot", () => {
    const wrapper = mount(MySpinner);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders the spinner element", () => {
    const wrapper = mount(MySpinner);
    const spinnerElement = wrapper.find(".animate-spin");
    expect(spinnerElement.exists()).toBe(true);
  });

  it("applies the provided CSS class to the wrapper div", () => {
    const customClass = "my-custom-class";
    const wrapper = mount(MySpinner, {
      props: {
        class: customClass,
      },
    });
    expect(wrapper.classes()).toContain(customClass);
  });

  it("renders with default name", () => {
    const wrapper = mount(MySpinner);
    expect(wrapper.vm.$options.name).toBe("my-spinner");
  });

  it("has a default prop for wrapper class", () => {
    const wrapper = mount(MySpinner);
    expect(wrapper.props("wrapperClass")).toBeUndefined();
  });
});
