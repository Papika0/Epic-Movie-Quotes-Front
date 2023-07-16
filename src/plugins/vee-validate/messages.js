import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: 'this field is required',
        email: 'invalid email format, please enter valid email',
        min: '{field} must have at least 0:{min} symbols',
        max: '{field} must have at least 0:{max} symbols',
        confirmed: 'passwords must match',
        numeric: 'this field must contain only numbers',
        lowercase: 'this field must contain only lowercase letters',
        english: '{field} must contain english letters',
        georgian: '{field} must contain georgian letters'
      },
      names: {
        email: 'email field',
        password: 'password field',
        confirm_password: 'confirm password field',
        username: 'username field',
        name_en: 'name field',
        name_ka: 'name field',
        year: 'year field',
        director_en: 'director field',
        director_ka: 'director field',
        content_en: 'content field',
        content_ka: 'content field',
        description_en: 'description field',
        description_ka: 'description field'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        min: '{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
        confirmed: 'პაროლები არ ემთხვევა',
        numeric: 'ველი უნდა შეიცავდეს მხოლოდ ციფრებს',
        lowercase: 'მეილი/სახელი უნდა შეიცავდეს მხოლოდ პატარა ასოებს',
        english: '{field} უნდა შეიცავდეს ინგლისურ ასოებს',
        georgian: '{field} უნდა შეიცავდეს ქართულ ასოებს',
        max: '{field} უნდა შეიცავდეს მაქსიმუმ 0:{max} სიმბოლოს'
      },
      names: {
        email: 'მეილის ველი',
        password: 'პაროლის ველი',
        confirm_password: 'განმეორებული პაროლის ველი',
        username: 'სახელის ველი',
        name_en: 'სახელის ველი',
        name_ka: 'სახელის ველი',
        year: 'წელის ველი',
        director_en: 'რეჟისორის ველი',
        director_ka: 'რეჟისორის ველი',
        content_en: 'შინაარსის ველი',
        content_ka: 'შინაარსის ველი',
        description_en: 'აღწერის ველი',
        description_ka: 'აღწერის ველი'
      }
    }
  })
})
