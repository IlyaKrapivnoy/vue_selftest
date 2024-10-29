import { mount } from "@vue/test-utils";
import Footer from "@/components/layout/Footer/MainFooter.vue";

describe("Footer.vue", () => {
  it("displays the current year", () => {
    const wrapper = mount(Footer);

    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(`by Ilya Krapivnoy ${currentYear}`);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
