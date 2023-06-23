import { createI18n } from "vue-i18n";
import en from "./lang/en/index.js";
import ge from "./lang/ge/index.js";

const messages = {
  en,
  ge,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

export default i18n;