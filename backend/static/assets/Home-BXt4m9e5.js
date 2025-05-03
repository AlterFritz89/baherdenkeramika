import { _ as _export_sfc, c as createElementBlock, a as createBaseVNode, t as toDisplayString, F as Fragment, r as renderList, b as createCommentVNode, d as axios, o as openBlock } from "./index-BbKLUdSk.js";
const _sfc_main = {
  data() {
    return {
      newsItems: []
    };
  },
  async created() {
    await this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get("http://localhost:8000/api/news/?ordering=-created_at");
        this.newsItems = response.data.map((item) => ({
          ...item,
          isExpanded: false
        }));
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      }
    },
    toggleExpand(newsItem) {
      newsItem.isExpanded = !newsItem.isExpanded;
    },
    getImageUrl(imagePath) {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `http://localhost:8000${imagePath}`;
    }
  }
};
const _hoisted_1 = { class: "home-page" };
const _hoisted_2 = { class: "news-title" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "news-content" };
const _hoisted_5 = { class: "preview-text" };
const _hoisted_6 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("h1", null, toDisplayString(_ctx.$t("news.title")), 1),
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.newsItems, (newsItem) => {
      return openBlock(), createElementBlock("div", {
        key: newsItem.id,
        class: "news-item"
      }, [
        createBaseVNode("h2", _hoisted_2, toDisplayString(_ctx.$i18n.locale === "ru" ? newsItem.title_ru : newsItem.title_tk), 1),
        newsItem.image ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: $options.getImageUrl(newsItem.image),
          class: "news-image"
        }, null, 8, _hoisted_3)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("p", _hoisted_5, toDisplayString(newsItem.isExpanded ? _ctx.$i18n.locale === "ru" ? newsItem.full_text_ru : newsItem.full_text_tk : _ctx.$i18n.locale === "ru" ? newsItem.preview_ru : newsItem.preview_tk), 1),
          createBaseVNode("button", {
            onClick: ($event) => $options.toggleExpand(newsItem),
            class: "read-more-btn"
          }, toDisplayString(newsItem.isExpanded ? _ctx.$t("news.close") : _ctx.$t("news.readMore")), 9, _hoisted_6)
        ])
      ]);
    }), 128))
  ]);
}
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d30373f2"]]);
export {
  Home as default
};
//# sourceMappingURL=Home-BXt4m9e5.js.map
