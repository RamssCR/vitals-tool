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
- [How it works](#how-it-works)
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
import "vitals-tool/dist/vitals-tool.css" // to inject library's styles for the component
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
> The Debugger component must only be used in development or staging mode.

## How it works
Right after the page is loaded, the `Debugger` components runs a on-load analysis
of your website and it displays a static report of the 3 last metrics (Accessibility,
Best Practices and SEO), all of them 3 manage a raw integer score of 0 to 1: 0 if the 
item doesn't pass the check and 1 if it does.

Accesibility is evaluated using `axe-core` under the hood and it's one of the metrics 
that can display different items based on what it covers during first-load analysis.

Web Vitals (or Vitals) are evaluated using the `web-vitals` library under the hood and is 
the only metric that displays a first-load result and it varies during user interaction, 
for better understanding of how web vitals metrics work, read this article about 
[web vitals](https://web.dev/articles/vitals).

## API

### Debugger

The `Debugger` component is the main entry point for using the vitals-tool library. It 
automatically collects and displays web vitals and other performance metrics.

```tsx
import "vitals-tool/dist/vitals-tool.css"
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