import { _ as _export_sfc, c as createElementBlock, a as createBaseVNode, t as toDisplayString, h as createTextVNode, w as withModifiers, o as openBlock, i as createBlock, b as createCommentVNode, F as Fragment, r as renderList, n as normalizeClass, d as axios, g as resolveComponent } from "./index-BbKLUdSk.js";
const _sfc_main$1 = {
  name: "ProductModal",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    getLocalizedName(item) {
      return item[`name_${this.$i18n.locale}`] || item.name_tk || "";
    },
    getImageUrl(imagePath) {
      if (!imagePath) return "/images/placeholder.jpg";
      return imagePath;
    }
  }
};
const _hoisted_1$1 = { class: "modal-content" };
const _hoisted_2$1 = ["src", "alt"];
const _hoisted_3$1 = { class: "modal-text" };
const _hoisted_4$1 = { class: "specs" };
const _hoisted_5$1 = { class: "modal-buttons" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "modal-overlay",
    onClick: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.$emit("close"), ["self"]))
  }, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("img", {
        src: $options.getImageUrl($props.product.image_url),
        alt: $options.getLocalizedName($props.product),
        class: "modal-image"
      }, null, 8, _hoisted_2$1),
      createBaseVNode("div", _hoisted_3$1, [
        createBaseVNode("h2", null, toDisplayString($options.getLocalizedName($props.product)), 1),
        createBaseVNode("div", _hoisted_4$1, [
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(_ctx.$t("products.sanitaryware.material")) + ":", 1),
            createTextVNode(" " + toDisplayString($props.product[`material_${_ctx.$i18n.locale}`]), 1)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(_ctx.$t("products.sanitaryware.dimensions")) + ":", 1),
            createTextVNode(" " + toDisplayString($props.product[`dimensions_${_ctx.$i18n.locale}`]), 1)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(_ctx.$t("products.sanitaryware.color")) + ":", 1),
            createTextVNode(" " + toDisplayString($props.product[`color_${_ctx.$i18n.locale}`]), 1)
          ]),
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(_ctx.$t("products.sanitaryware.price")) + ":", 1),
            createTextVNode(" " + toDisplayString($props.product.price) + " " + toDisplayString(_ctx.$t("currency")), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
            class: "close-btn"
          }, toDisplayString(_ctx.$t("news.close")), 1),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("add-to-cart", $props.product)),
            class: "cart-btn"
          }, toDisplayString(_ctx.$t("add.add_to_cart")), 1)
        ])
      ])
    ])
  ]);
}
const ProductModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-1c49d1f9"]]);
const _sfc_main = {
  name: "SanitarywareProducts",
  components: {
    ProductModal
  },
  data() {
    return {
      products: [],
      categories: [],
      activeCategory: null,
      selectedProduct: null,
      loading: true,
      error: null
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => product.category.id === this.activeCategory);
    }
  },
  methods: {
    getLocalizedName(item) {
      return item[`name_${this.$i18n.locale}`] || item.name_tk || "";
    },
    getImageUrl(imagePath) {
      if (!imagePath) return "/images/placeholder.jpg";
      return imagePath;
    },
    handleImageError(e) {
      e.target.src = "/images/placeholder.jpg";
    },
    addToCart(product) {
      this.$store.dispatch("cart/addItem", product);
      this.$toast.success(this.$t("cart.added_to_cart"));
    },
    async fetchData() {
      var _a;
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8000/api/sanitary/products/"),
          axios.get("http://localhost:8000/api/sanitary/categories/")
        ]);
        this.products = productsRes.data;
        this.categories = categoriesRes.data;
        this.activeCategory = ((_a = this.categories[0]) == null ? void 0 : _a.id) || null;
      } catch (error) {
        this.error = error;
        this.$toast.error(this.$t("errors.loading_data"));
      } finally {
        this.loading = false;
      }
    }
  },
  async created() {
    await this.fetchData();
  }
};
const _hoisted_1 = { class: "sanitaryware-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "categories" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = {
  key: 0,
  class: "loading-spinner"
};
const _hoisted_6 = {
  key: 1,
  class: "products-gallery"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = ["src", "alt"];
const _hoisted_9 = { class: "product-info" };
const _hoisted_10 = { class: "price" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProductModal = resolveComponent("ProductModal");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("h1", null, toDisplayString(_ctx.$t("products.sanitaryware.heading")), 1),
      createBaseVNode("p", null, toDisplayString(_ctx.$t("products.sanitaryware.description")), 1)
    ]),
    createBaseVNode("div", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.categories, (category) => {
        return openBlock(), createElementBlock("button", {
          key: category.id,
          onClick: ($event) => $data.activeCategory = category.id,
          class: normalizeClass({ active: $data.activeCategory === category.id })
        }, toDisplayString($options.getLocalizedName(category)), 11, _hoisted_4);
      }), 128))
    ]),
    $data.loading ? (openBlock(), createElementBlock("div", _hoisted_5, _cache[3] || (_cache[3] = [
      createBaseVNode("div", { class: "spinner" }, null, -1)
    ]))) : (openBlock(), createElementBlock("div", _hoisted_6, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredProducts, (product) => {
        return openBlock(), createElementBlock("div", {
          key: product.id,
          class: "product-card",
          onClick: ($event) => $data.selectedProduct = product
        }, [
          createBaseVNode("img", {
            src: $options.getImageUrl(product.image_url),
            alt: $options.getLocalizedName(product),
            class: "product-image",
            onError: _cache[0] || (_cache[0] = (...args) => $options.handleImageError && $options.handleImageError(...args))
          }, null, 40, _hoisted_8),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("h3", null, toDisplayString($options.getLocalizedName(product)), 1),
            createBaseVNode("p", _hoisted_10, toDisplayString(product.price) + " " + toDisplayString(_ctx.$t("currency")), 1)
          ])
        ], 8, _hoisted_7);
      }), 128))
    ])),
    $data.selectedProduct ? (openBlock(), createBlock(_component_ProductModal, {
      key: 2,
      product: $data.selectedProduct,
      onClose: _cache[1] || (_cache[1] = ($event) => $data.selectedProduct = null),
      onAddToCart: $options.addToCart
    }, null, 8, ["product", "onAddToCart"])) : createCommentVNode("", true),
    createBaseVNode("button", {
      onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$router.go(-1)),
      class: "back-btn"
    }, toDisplayString(_ctx.$t("back.back")), 1)
  ]);
}
const ProductsSanitaryware = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-035dc97d"]]);
export {
  ProductsSanitaryware as default
};
//# sourceMappingURL=ProductsSanitaryware-Cfrsk96K.js.map
