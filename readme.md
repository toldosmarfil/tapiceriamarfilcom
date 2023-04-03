# Web digitalstrategy , parcel , nunjuckts

Este es un generador de sitios web estático llamado "Web holysite", utiliza herramientas como Parcel , dart sass,  Nunjuckts.

Para desarrollar en él, primero debes clonar o descargar este repositorio. Luego, debes instalar las dependencias utilizando npm install. Finalmente, puedes ejecutar el modo de desarrollo con npm run start, esto abrirá una pestaña en el navegador con la url de desarrollo "http://localhost:1234/".



## Development

1. **Clone** or [download](https://github.com/.....zip) this repository.

   ```
   git clone https://github.com/.....zip
   ```

2. **Install** dependencias.

   ```
   npm install
   ```

3. **Run** dev mode. It will open a browser tab with the dev url [`http://localhost:1234/`](http://localhost:1234/).

   ```
   npm run start
   ```

## Production build

Ejecuta el script de construcción y el sitio web optimizado para producción será generado en la carpeta /dist.

```
npm run build
```

## Serve production build localmente

Si deseas servir tu build de producción (la carpeta generada /dist) localmente, solo debes ejecutar este comando y abrir http://localhost:5000/ en tu navegador. Este comando ejecuta el comando npm run build antes de servir la carpeta /dist.

```
npm run serve
```


## Habilita emmet en este archivo


 "emmet.includeLanguages": {
    "nunjucks": "html"
  }

## Tech stack

- [Parcel](https://parceljs.org/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Sass](https://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Stylelint](https://stylelint.io/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [Imagemin](https://github.com/imagemin/imagemin)

## To do

- [ ] Detail all features: linting, formatting, building, etc.
- [ ] Add all available commands.
- [ ] Explain why there are two `/static` folders.
- [ ] Warn against how Parcel treats the `site.webmanifest` file.
- [ ] Explain how to config Imagemin.
- [ ] Explain how to config Nunjucks.
- [ ] Find a good Nunjucks code editor formatter.
- [ ] Add recommended extensions for development.
- [ ] Repair arrows in swiper


- [ ]  Elementos en json "serve": "npx serve dist",
- [ ]  Elementos en json "lint": "npm run lint:js && npm run lint:css",
- [ ]  Elementos en json "lint:fix": "npm run lint:js:fix && npm run lint:css:fix",
- [ ]  Elementos en json "lint:js": "eslint 'src/**/*.js'",
- [ ]  Elementos en json "lint:js:fix": "eslint  --fix 'src/**/*.js'",
- [ ]  Elementos en json "lint:css": "stylelint 'src/**/*.?(s)css'",
- [ ]  Elementos en json "lint:css:fix": "stylelint --fix 'src/**/*.?(s)css'",
- [ ]  Elementos en json "prettier": "prettier 'src/**/*.+(js|html|css|scss|json|md|yml|yaml|md)'",
- [ ]  Elementos en json "format": "npm run prettier -- --write",
- [ ]  Elementos en json "validate": "npm run lint && npm run prettier -- --list-different",
- [ ]  Elementos en json "test": "test -e dist/index.html && exit 0 || exit 1"
