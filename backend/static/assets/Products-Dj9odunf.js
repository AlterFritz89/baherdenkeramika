import { _ as _export_sfc, c as createElementBlock, a as createBaseVNode, t as toDisplayString, e as createVNode, f as withCtx, g as resolveComponent, o as openBlock } from "./index-BbKLUdSk.js";
const _sfc_main = {
  name: "Products"
};
const _hoisted_1 = { class: "products-page" };
const _hoisted_2 = { class: "product-links" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("h1", null, toDisplayString(_ctx.$t("products.title")), 1),
    createBaseVNode("div", _hoisted_2, [
      createVNode(_component_router_link, {
        to: "/products/tiles",
        class: "product-card"
      }, {
        default: withCtx(() => [
          createBaseVNode("h2", null, toDisplayString(_ctx.$t("products.tiles.heading")), 1),
          createBaseVNode("p", null, toDisplayString(_ctx.$t("products.tiles.description")), 1)
        ]),
        _: 1
      }),
      createVNode(_component_router_link, {
        to: "/products/sanitaryware",
        class: "product-card"
      }, {
        default: withCtx(() => [
          createBaseVNode("h2", null, toDisplayString(_ctx.$t("products.sanitaryware.heading")), 1),
          createBaseVNode("p", null, toDisplayString(_ctx.$t("products.sanitaryware.description")), 1)
        ]),
        _: 1
      })
    ])
  ]);
}
const Products = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-773132ed"]]);
export {
  Products as default
};
//# sourceMappingURL=Products-Dj9odunf.js.map
