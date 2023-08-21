import { mount } from "@vue/test-utils";
import MyAlert from "@/components/common/MyAlert/MyAlert.vue";

describe("MyAlert", () => {
  it("renders correctly when isAlert is true", () => {
    const wrapperClass = "my-alert-wrapper";
    const title = "Alert Title";
    const type = "warning";
    const description = "This is the alert description";
    const showIcon = true;
    const closable = true;

    const wrapper = mount(MyAlert, {
      props: {
        isAlert: true,
        wrapperClass,
        title,
        type,
        description,
        showIcon,
        closable,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain(wrapperClass);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
