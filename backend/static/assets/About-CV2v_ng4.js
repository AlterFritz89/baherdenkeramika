import { _ as _export_sfc, c as createElementBlock, a as createBaseVNode, b as createCommentVNode, t as toDisplayString, n as normalizeClass, F as Fragment, r as renderList, w as withModifiers, d as axios, o as openBlock } from "./index-BbKLUdSk.js";
const _sfc_main = {
  data() {
    return {
      activeTab: "about",
      galleryImages: [],
      galleryActive: false,
      currentImageIndex: 0,
      currentLanguage: this.$i18n.locale
    };
  },
  computed: {
    currentImage() {
      return this.galleryImages[this.currentImageIndex] || {};
    }
  },
  async created() {
    await this.fetchGalleryImages();
    this.$watch(() => this.$i18n.locale, (newVal) => {
      this.currentLanguage = newVal;
    });
  },
  methods: {
    async fetchGalleryImages() {
      try {
        const response = await axios.get("http://localhost:8000/api/gallery/");
        this.galleryImages = response.data;
      } catch (error) {
        console.error("Ошибка загрузки галереи:", error);
      }
    },
    openGallery(index) {
      this.currentImageIndex = index;
      this.galleryActive = true;
      document.body.style.overflow = "hidden";
    },
    closeGallery() {
      this.galleryActive = false;
      document.body.style.overflow = "auto";
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    },
    getImageUrl(imagePath) {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `http://localhost:8000${imagePath}`;
    }
  }
};
const _hoisted_1 = { class: "about-page" };
const _hoisted_2 = { class: "section-header" };
const _hoisted_3 = { class: "section-tabs" };
const _hoisted_4 = {
  key: 0,
  class: "about-section"
};
const _hoisted_5 = { class: "about-content" };
const _hoisted_6 = {
  key: 1,
  class: "gallery-section"
};
const _hoisted_7 = { class: "gallery-grid" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = ["src", "alt"];
const _hoisted_10 = { class: "image-overlay" };
const _hoisted_11 = {
  key: 2,
  class: "gallery-modal"
};
const _hoisted_12 = { class: "modal-content" };
const _hoisted_13 = { class: "image-container" };
const _hoisted_14 = ["src", "alt"];
const _hoisted_15 = { class: "image-info" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("h1", null, toDisplayString(_ctx.$t("about.title")), 1),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => $data.activeTab = "about"),
          class: normalizeClass({ active: $data.activeTab === "about" })
        }, toDisplayString(_ctx.$t("about.tabs.about")), 3),
        createBaseVNode("button", {
          onClick: _cache[1] || (_cache[1] = ($event) => $data.activeTab = "gallery"),
          class: normalizeClass({ active: $data.activeTab === "gallery" })
        }, toDisplayString(_ctx.$t("about.tabs.gallery")), 3)
      ])
    ]),
    $data.activeTab === "about" ? (openBlock(), createElementBlock("div", _hoisted_4, [
      createBaseVNode("div", _hoisted_5, [
        createBaseVNode("p", null, toDisplayString(_ctx.$t("about.text")), 1)
      ])
    ])) : createCommentVNode("", true),
    $data.activeTab === "gallery" ? (openBlock(), createElementBlock("div", _hoisted_6, [
      createBaseVNode("div", _hoisted_7, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.galleryImages, (image, index) => {
          return openBlock(), createElementBlock("div", {
            key: image.id,
            class: "gallery-item",
            onClick: ($event) => $options.openGallery(index)
          }, [
            image.image ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: $options.getImageUrl(image.image),
              alt: $data.currentLanguage === "ru" ? image.title_ru : image.title_tk,
              class: "gallery-thumb"
            }, null, 8, _hoisted_9)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("h3", null, toDisplayString($data.currentLanguage === "ru" ? image.title_ru : image.title_tk), 1)
            ])
          ], 8, _hoisted_8);
        }), 128))
      ])
    ])) : createCommentVNode("", true),
    $data.galleryActive ? (openBlock(), createElementBlock("div", _hoisted_11, [
      createBaseVNode("div", {
        class: "modal-overlay",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.closeGallery && $options.closeGallery(...args))
      }),
      createBaseVNode("div", _hoisted_12, [
        createBaseVNode("button", {
          class: "nav-btn prev-btn",
          onClick: _cache[3] || (_cache[3] = withModifiers((...args) => $options.prevImage && $options.prevImage(...args), ["stop"]))
        }, "❮"),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode("img", {
            src: $options.getImageUrl($options.currentImage.image),
            alt: $data.currentLanguage === "ru" ? $options.currentImage.title_ru : $options.currentImage.title_tk,
            class: "modal-image",
            onError: _cache[4] || (_cache[4] = (...args) => _ctx.handleImageError && _ctx.handleImageError(...args))
          }, null, 40, _hoisted_14),
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("h2", null, toDisplayString($data.currentLanguage === "ru" ? $options.currentImage.title_ru : $options.currentImage.title_tk), 1),
            createBaseVNode("p", null, toDisplayString($data.currentLanguage === "ru" ? $options.currentImage.description_ru : $options.currentImage.description_tk), 1)
          ])
        ]),
        createBaseVNode("button", {
          class: "nav-btn next-btn",
          onClick: _cache[5] || (_cache[5] = withModifiers((...args) => $options.nextImage && $options.nextImage(...args), ["stop"]))
        }, "❯"),
        createBaseVNode("button", {
          class: "close-btn",
          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => $options.closeGallery && $options.closeGallery(...args), ["stop"]))
        }, "×")
      ])
    ])) : createCommentVNode("", true)
  ]);
}
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f0b8bc0b"]]);
export {
  About as default
};
//# sourceMappingURL=About-CV2v_ng4.js.map
