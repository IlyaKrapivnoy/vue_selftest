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

  it("correctly renders the last page", () => {
    const wrapper = mount(MyPagination, {
      props: {
        page: 10,
        totalPages: 10,
      },
    });

    const lastPageElement = wrapper.find(".page-item:last-child");
    expect(lastPageElement.text()).toBe("10");
  });

  it("correctly highlights the current page", () => {
    const wrapper = mount(MyPagination, {
      props: {
        page: 3,
        totalPages: 7,
      },
    });

    const currentPageItem = wrapper.find(".page-item.current-page");
    expect(currentPageItem.exists()).toBe(true);
  });

  it("handles page-change event correctly", async () => {
    const wrapper = mount(MyPagination, {
      props: {
        page: 3,
        totalPages: 7,
      },
    });

    await wrapper.vm.changePage(5);

    expect(wrapper.emitted("page-change")).toBeTruthy();
    expect(wrapper.emitted("page-change")[0][0]).toBe(5);
  });
});
