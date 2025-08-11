# Vitals Tool

![Pull Request Automation](https://github.com/RamssCR/vitals-tool/actions/workflows/unit-testing.yaml/badge.svg)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)

---

`vitals-tool` is a React "plug-and-play" library that provides a `Debugger` component for inspecting
website metrics and web vitals in the same way as performing a Lighthouse audit without
the need for manual analysis.

It compiles a first-load report of basic metrics like Accessibility, Best Practices and
SEO, as well as tracking web vitals like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)
during user interaction.

---

## Index

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)

## Installation

Run the following command to install the package:

```bash
# For npm
npm install vitals-tool
```

```bash
# For yarn
yarn add vitals-tool
```

```bash
# For pnpm
pnpm add vitals-tool
```

## Usage
In order to use the analyzer, you need to import the `Debugger` component from the `vitals-tool` package.

```tsx
import { Debugger } from 'vitals-tool'

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      {import.meta.env.DEV && <Debugger />}
    </div>
  )
}
```

> [!NOTE]
> The Debugger component must only be used in development mode.

## API

### Debugger

The `Debugger` component is the main entry point for using the vitals-tool library. It 
automatically collects and displays web vitals and other performance metrics.

```tsx
import { Debugger } from 'vitals-tool'

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      {import.meta.env.DEV && <Debugger />}
    </div>
  )
}
```

## Contributing

We welcome contributions to the `vitals-tool` library! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## Tests

To run the tests for the `vitals-tool` library, use the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.