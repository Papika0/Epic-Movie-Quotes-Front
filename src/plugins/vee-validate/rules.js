import { defineRule } from "vee-validate";
import { required, email, min, max ,alpha_num , confirmed , numeric , alpha} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha", alpha);
defineRule("alpha_num", alpha_num);
defineRule("confirmed", confirmed);
defineRule("numeric", numeric);
defineRule('lowercase', value => value === value?.toLowerCase());
defineRule('georgian', value => {
  const georgianRegex = /^[\u10A0-\u10FF\s]+$/;
  return georgianRegex.test(value);
});


