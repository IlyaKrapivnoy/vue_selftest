import { mount } from "@vue/test-utils";
import NavMenu from "@/components/layout/Header/MainHeader.vue";

describe("NavMenu.vue", () => {
  it("renders without errors", () => {
    const wrapper = mount(NavMenu);

    expect(wrapper.exists()).toBe(true);
  });

  it("matches snapshot", () => {
    const wrapper = mount(NavMenu);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
