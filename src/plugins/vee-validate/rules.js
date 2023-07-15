import { defineRule } from 'vee-validate'
import { required, email, min, max, confirmed, numeric } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('confirmed', confirmed)
defineRule('numeric', numeric)
defineRule('lowercase', (value) => value === value?.toLowerCase())

defineRule('english', (value) => {
  const englishRegex = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/
  return englishRegex.test(value)
})

defineRule('georgian', (value) => {
  const georgianRegex = /^[\u10A0-\u10FF\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/
  return georgianRegex.test(value)
})
