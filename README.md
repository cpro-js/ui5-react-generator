# Generator UI5 React

Scaffolds a complete React.js app based on [Vite](https://vitejs.dev/).
The generated app features special Vite plugins (see [our ui5-vite package](https://github.com/cpro-js/ui5-vite))
in order to realize a seamless Fiori Launchpad integration.

The generated app uses [UI5 Web Components for React](https://sap.github.io/ui5-webcomponents-react/)
as component library. To further streamline the development, the generated app also comes with
[our form components](https://github.com/cpro-js/react-ui5-components) which are build on top of the UI5
Web Components for React.

## Core Libs

As React.js only acts as library focussed on the view layer and not as full-featured framework
(like Angular, for example), you will need some libraries in order to implement an app.

Via the package `@cpro-js/react-core` we provide you with the following core libraries:

- [Inversify](https://inversify.io/): Dependency injection
- [MobX](https://mobx.js.org/README.html): State management
- [I18Next](https://www.i18next.com/): Internationalization
- [date-fns](https://date-fns.org/): Date utility

The generated app will contain examples of how these core libs are used.

## Setup

### Installation

Yeoman must be installed, if you haven't done so already:
`npm install -g yo`

To install this generator: `npm install -g generator-ui5-react`

### Scaffolding

1. Create a new directory for your app
2. Change into that directory
3. Call `yo ui5-react` and follow the instructions on the screen

## Local Testing

For testing any development of this package:

1. `npm run build`
2. `npm link`
3. create a new folder for the test app
4. create the test app: `yo ui5-react`
5. start & test the app: `npm run start`

## License

MIT - see [License](./LICENSE).
