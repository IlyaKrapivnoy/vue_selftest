import { shallowMount } from "@vue/test-utils";
import YourComponentName from "@/components/common/CustomCard/CustomCard.vue";

describe("YourComponentName", () => {
  it("renders correctly", () => {
    const cardTextBold = "Bold Text";
    const cardTextLight = "Light Text";
    const buttons = [
      { type: "primary", name: "Button 1", click: jest.fn() },
      { type: "success", name: "Button 2", click: jest.fn() },
    ];

    const wrapper = shallowMount(YourComponentName, {
      props: { cardTextBold, cardTextLight, buttons },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
