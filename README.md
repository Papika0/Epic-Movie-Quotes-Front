# Epic MovieQuotes

> "MovieQuotes" is a platform that allows users to register, log in, and explore a vast collection of quotes from movies. It provides a seamless experience for movie enthusiasts to discover and appreciate memorable lines and dialogues from their favorite films.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Acknowledgements](#acknowledgements)

## Prerequisites

- Vue 3
- Node - v14.20.0 and up
- npm@6 and up

## Tech Stack

Used dependencies :

- Vue.js
- Tailwind CSS - version 3.0
- Axios
- Vee-validate
- ESLint
- Prettier
- Pinia
- i18n
- laravel-echo
- pusher-js


## Getting Started

1. First of all, clone Covid Questionnaire repository from Github:
```sh
git clone https://github.com/RedberryInternship/dato-papismedovi-epic-movie-quotes.git
```

#
2. Install all the dependencies :
```sh
npm install
```

#
3. Configure your .env file with your domain credentials and pusher credentials.

```sh
cp .env.example .env
```

#
**Sanctum:**
>VITE_API_BASE_URL=http://backdomain.com/api
>VITE_API_AUTH_URL=http://backdomain.com/
>VITE_API_THUMBNAIL_URL=http://backdomain.com/storage/
>BASE_URL=http://yourdomain.com

#
**Pusher:**
>VITE_PUSHER_APP_KEY=

#
4. Compile and Minify for Production :
```sh
npm run build
```
#
5. Run Vue's built-in development server:

```sh
npm run dev
```
## Development

`npm run dev` - Use this command in terminal to launch local server and tailwind configuration.

## Acknowledgements
- Project design : https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?node-id=0%3A1&mode=dev