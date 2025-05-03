import { _ as _export_sfc, c as createElementBlock, a as createBaseVNode, b as createCommentVNode, t as toDisplayString, F as Fragment, r as renderList, w as withModifiers, h as createTextVNode, d as axios, o as openBlock } from "./index-BbKLUdSk.js";
const _sfc_main = {
  name: "ProductsTiles",
  data() {
    return {
      tiles: [],
      selectedTile: null
    };
  },
  async created() {
    await this.fetchTiles();
  },
  methods: {
    async fetchTiles() {
      try {
        const response = await axios.get("http://localhost:8000/api/tiles/");
        this.tiles = response.data;
      } catch (error) {
        console.error("Ошибка загрузки плитки:", error);
      }
    },
    getImageUrl(imagePath) {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `http://localhost:8000${imagePath}`;
    }
  }
};
const _hoisted_1 = { class: "tiles-gallery" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["src", "alt"];
const _hoisted_4 = { class: "modal-content" };
const _hoisted_5 = ["src", "alt"];
const _hoisted_6 = { class: "modal-text" };
const _hoisted_7 = { class: "modal-buttons" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _cache[3] || (_cache[3] = createBaseVNode("div", { class: "tiles-page" }, [
      createBaseVNode("div", { class: "navigation-buttons" })
    ], -1)),
    createBaseVNode("h1", null, toDisplayString(_ctx.$t("products.tiles.heading")), 1),
    createBaseVNode("p", null, toDisplayString(_ctx.$t("products.tiles.description")), 1),
    createBaseVNode("div", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.tiles, (tile) => {
        return openBlock(), createElementBlock("div", {
          key: tile.id,
          class: "tile-card",
          onClick: ($event) => $data.selectedTile = tile
        }, [
          createBaseVNode("img", {
            src: $options.getImageUrl(tile.image),
            alt: tile.name[_ctx.$i18n.locale],
            class: "tile-image"
          }, null, 8, _hoisted_3),
          createBaseVNode("p", null, toDisplayString(tile.name[_ctx.$i18n.locale]), 1)
        ], 8, _hoisted_2);
      }), 128))
    ]),
    $data.selectedTile ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "modal-overlay",
      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $data.selectedTile = null, ["self"]))
    }, [
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("img", {
          src: $options.getImageUrl($data.selectedTile.image),
          alt: $data.selectedTile.name[_ctx.$i18n.locale],
          class: "modal-image"
        }, null, 8, _hoisted_5),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("h2", null, toDisplayString($data.selectedTile.name[_ctx.$i18n.locale]), 1),
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(_ctx.$t("products.tiles.size")) + ":", 1),
            createTextVNode(" " + toDisplayString($data.selectedTile.characteristics.size[_ctx.$i18n.locale]), 1)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(_ctx.$t("products.tiles.color")) + ":", 1),
            createTextVNode(" " + toDisplayString($data.selectedTile.characteristics.color[_ctx.$i18n.locale]), 1)
          ]),
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => $data.selectedTile = null),
              class: "close-btn"
            }, toDisplayString(_ctx.$t("news.close")), 1)
          ])
        ])
      ])
    ])) : createCommentVNode("", true),
    createBaseVNode("button", {
      onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$router.go(-1)),
      class: "back-btn"
    }, toDisplayString(_ctx.$t("back.back")), 1)
  ], 64);
}
const ProductsTiles = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5905a8e8"]]);
export {
  ProductsTiles as default
};
//# sourceMappingURL=ProductsTiles-MlFZsclz.js.map
