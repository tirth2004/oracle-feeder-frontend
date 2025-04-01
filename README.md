# SchizoChain

The unhinged oracle with 1s finality, embracing multi-truth consensus for truly decentralized, fee-efficient data.

A modern React-based frontend application for interacting with an Oracle Feeder system. This application provides a user interface for managing and interacting with oracle data on the blockchain.

## Demo

Watch a demo of the application in action:
[View Demo Video](https://drive.google.com/file/d/1PI52KiezAhEwY_awsKoVyxT-VuF_74qf/view?usp=sharing)

## Features

- Modern, responsive UI built with React and TailwindCSS
- Web3 integration using RainbowKit and ethers.js
- React Router for navigation
- TypeScript for type safety
- Vite for fast development and building

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Web3:** RainbowKit, ethers.js
- **Routing:** React Router
- **Build Tool:** Vite
- **UI Components:** Radix UI

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tirth2004/oracle-feeder-frontend
cd oracle-feeder-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` by default.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
oracle-feeder-frontend/
├── src/
│   ├── utils/           # Utility components and functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
