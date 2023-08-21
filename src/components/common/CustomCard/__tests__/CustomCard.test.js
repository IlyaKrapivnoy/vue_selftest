import { shallowMount } from "@vue/test-utils";
import CustomCard from "@/components/common/CustomCard/CustomCard.vue";

describe("CustomCard", () => {
  it("renders correctly", () => {
    const cardTextBold = "Bold Text";
    const cardTextLight = "Light Text";
    const buttons = [
      { type: "primary", name: "Button 1", click: jest.fn() },
      { type: "success", name: "Button 2", click: jest.fn() },
    ];

    const wrapper = shallowMount(CustomCard, {
      props: { cardTextBold, cardTextLight, buttons },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
