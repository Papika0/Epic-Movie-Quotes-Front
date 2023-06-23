import { defineRule } from "vee-validate";
import { required, email, min, max ,alpha_num , confirmed} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha_num", alpha_num);
defineRule("confirmed", confirmed);

defineRule('lowercase', value => value === value?.toLowerCase());

