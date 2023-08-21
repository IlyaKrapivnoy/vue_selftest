import { mount } from "@vue/test-utils";
import MyPagination from "@/components/common/MyPagination/MyPagination.vue";

describe("MyPagination", () => {
  it("matches snapshot", () => {
    const wrapper = mount(MyPagination, {
      props: {
        page: 1,
        totalPages: 5,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("emits page-change event when a page is clicked", async () => {
    const wrapper = mount(MyPagination, {
      props: {
        page: 3,
        totalPages: 7,
      },
    });

    const pageItem = wrapper.find(".page-item:nth-child(4)");
    await pageItem.trigger("click");

    expect(wrapper.emitted("page-change")).toBeTruthy();
    expect(wrapper.emitted("page-change")[0][0]).toBe(4);
  });
});
