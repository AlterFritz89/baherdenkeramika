import { _ as _export_sfc, c as createElementBlock, a as createBaseVNode, b as createCommentVNode, t as toDisplayString, w as withModifiers, j as withDirectives, v as vModelText, k as vModelSelect, F as Fragment, r as renderList, h as createTextVNode, d as axios, o as openBlock } from "./index-BbKLUdSk.js";
const _sfc_main = {
  name: "FeedbackForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      feedbacks: [],
      loading: false,
      success: false,
      error: false
    };
  },
  async created() {
    await this.fetchFeedbacks();
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const response = await axios.get("http://localhost:8000/api/feedback/");
        this.feedbacks = response.data;
      } catch (err) {
        console.error("Ошибка загрузки отзывов:", err);
      }
    },
    async submitForm() {
      this.loading = true;
      this.success = false;
      this.error = false;
      try {
        await axios.post("http://localhost:8000/api/feedback/", this.form);
        this.success = true;
        this.form = { name: "", email: "", subject: "", message: "" };
      } catch (err) {
        console.error("Ошибка отправки:", err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  }
};
const _hoisted_1 = { class: "feedback-page" };
const _hoisted_2 = { class: "feedback-container" };
const _hoisted_3 = { class: "feedback-title" };
const _hoisted_4 = { class: "content-grid" };
const _hoisted_5 = { class: "contact-info" };
const _hoisted_6 = { class: "info-card" };
const _hoisted_7 = { class: "info-card" };
const _hoisted_8 = { class: "info-card" };
const _hoisted_9 = { class: "form-group" };
const _hoisted_10 = { for: "name" };
const _hoisted_11 = ["placeholder"];
const _hoisted_12 = { class: "form-group" };
const _hoisted_13 = { for: "email" };
const _hoisted_14 = ["placeholder"];
const _hoisted_15 = { class: "form-group" };
const _hoisted_16 = { for: "subject" };
const _hoisted_17 = { value: "" };
const _hoisted_18 = { value: "question" };
const _hoisted_19 = { value: "order" };
const _hoisted_20 = { value: "cooperation" };
const _hoisted_21 = { value: "other" };
const _hoisted_22 = { class: "form-group" };
const _hoisted_23 = { for: "message" };
const _hoisted_24 = ["placeholder"];
const _hoisted_25 = ["disabled"];
const _hoisted_26 = { key: 0 };
const _hoisted_27 = { key: 1 };
const _hoisted_28 = {
  key: 0,
  class: "success-message"
};
const _hoisted_29 = {
  key: 1,
  class: "error-message"
};
const _hoisted_30 = {
  key: 0,
  class: "feedback-list"
};
const _hoisted_31 = { class: "feedback-list-title" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("h1", _hoisted_3, toDisplayString(_ctx.$t("feedback.title")), 1),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            _cache[5] || (_cache[5] = createBaseVNode("i", { class: "fas fa-map-marker-alt" }, null, -1)),
            createBaseVNode("h3", null, toDisplayString(_ctx.$t("contact.address")), 1),
            createBaseVNode("p", null, toDisplayString(_ctx.$t("contact.placeholderaddress")), 1)
          ]),
          createBaseVNode("div", _hoisted_7, [
            _cache[6] || (_cache[6] = createBaseVNode("i", { class: "fas fa-phone" }, null, -1)),
            createBaseVNode("h3", null, toDisplayString(_ctx.$t("contact.phone")), 1),
            createBaseVNode("p", null, toDisplayString(_ctx.$t("contact.placeholderphone")), 1)
          ]),
          createBaseVNode("div", _hoisted_8, [
            _cache[7] || (_cache[7] = createBaseVNode("i", { class: "fas fa-envelope" }, null, -1)),
            createBaseVNode("h3", null, toDisplayString(_ctx.$t("contact.email")), 1),
            createBaseVNode("p", null, toDisplayString(_ctx.$t("contact.placeholderemail")), 1)
          ])
        ]),
        createBaseVNode("form", {
          form: "",
          class: "feedback-form",
          onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => $options.submitForm && $options.submitForm(...args), ["prevent"]))
        }, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("label", _hoisted_10, toDisplayString(_ctx.$t("feedback.name")), 1),
            withDirectives(createBaseVNode("input", {
              type: "text",
              id: "name",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.form.name = $event),
              placeholder: _ctx.$t("feedback.name_placeholder"),
              required: ""
            }, null, 8, _hoisted_11), [
              [vModelText, $data.form.name]
            ])
          ]),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("label", _hoisted_13, toDisplayString(_ctx.$t("feedback.email")), 1),
            withDirectives(createBaseVNode("input", {
              type: "email",
              id: "email",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.form.email = $event),
              placeholder: _ctx.$t("feedback.email_placeholder"),
              required: ""
            }, null, 8, _hoisted_14), [
              [vModelText, $data.form.email]
            ])
          ]),
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("label", _hoisted_16, toDisplayString(_ctx.$t("feedback.subject")), 1),
            withDirectives(createBaseVNode("select", {
              id: "subject",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.form.subject = $event),
              required: ""
            }, [
              createBaseVNode("option", _hoisted_17, toDisplayString(_ctx.$t("feedback.select_subject")), 1),
              createBaseVNode("option", _hoisted_18, toDisplayString(_ctx.$t("feedback.question")), 1),
              createBaseVNode("option", _hoisted_19, toDisplayString(_ctx.$t("feedback.order")), 1),
              createBaseVNode("option", _hoisted_20, toDisplayString(_ctx.$t("feedback.cooperation")), 1),
              createBaseVNode("option", _hoisted_21, toDisplayString(_ctx.$t("feedback.other")), 1)
            ], 512), [
              [vModelSelect, $data.form.subject]
            ])
          ]),
          createBaseVNode("div", _hoisted_22, [
            createBaseVNode("label", _hoisted_23, toDisplayString(_ctx.$t("feedback.message")), 1),
            withDirectives(createBaseVNode("textarea", {
              id: "message",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.form.message = $event),
              placeholder: _ctx.$t("feedback.message_placeholder"),
              required: ""
            }, null, 8, _hoisted_24), [
              [vModelText, $data.form.message]
            ])
          ]),
          createBaseVNode("button", {
            type: "submit",
            class: "submit-btn",
            disabled: $data.loading
          }, [
            !$data.loading ? (openBlock(), createElementBlock("span", _hoisted_26, toDisplayString(_ctx.$t("feedback.submit")), 1)) : (openBlock(), createElementBlock("span", _hoisted_27, toDisplayString(_ctx.$t("feedback.sending")) + "...", 1))
          ], 8, _hoisted_25),
          $data.success ? (openBlock(), createElementBlock("div", _hoisted_28, toDisplayString(_ctx.$t("feedback.success")), 1)) : createCommentVNode("", true),
          $data.error ? (openBlock(), createElementBlock("div", _hoisted_29, toDisplayString(_ctx.$t("feedback.error")), 1)) : createCommentVNode("", true)
        ], 32)
      ]),
      $data.feedbacks.length ? (openBlock(), createElementBlock("div", _hoisted_30, [
        createBaseVNode("h2", _hoisted_31, toDisplayString(_ctx.$t("feedback.approved_comments")), 1),
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.feedbacks, (feedback) => {
          return openBlock(), createElementBlock("div", {
            class: "feedback-item",
            key: feedback.id
          }, [
            createBaseVNode("p", null, [
              createBaseVNode("strong", null, toDisplayString(feedback.name), 1),
              createTextVNode(" (" + toDisplayString(_ctx.$t(`feedback.subjects.${feedback.subject}`)) + ")", 1)
            ]),
            createBaseVNode("p", null, toDisplayString(feedback.message), 1),
            createBaseVNode("small", null, toDisplayString(new Date(feedback.created_at).toLocaleDateString(_ctx.$i18n.locale)), 1)
          ]);
        }), 128))
      ])) : createCommentVNode("", true)
    ])
  ]);
}
const FeedbackForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d031fb6c"]]);
export {
  FeedbackForm as default
};
//# sourceMappingURL=FeedbackForm-Cqck84z8.js.map
