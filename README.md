# On-Chain Pixelart NFT Creator

## Overview

The On-Chain Pixelart NFT Creator is an innovative platform that empowers users to design pixel art in their browser and mint these creations as unique NFTs directly on the blockchain. This tool stands out by embedding the artwork's base64-encoded data directly onto the blockchain, ensuring that your art is permanently stored without relying on potentially unreliable external links. With support for various blockchains, artists have the freedom to immortalize their work on their platform of choice.

## Features

- **Pixel Art Creation Tool:** A user-friendly, web-based interface for crafting pixel art, equipped with a customizable color palette and grid.
- **Blockchain Selection:** Users can choose their preferred blockchain for minting NFTs, including Ethereum, Polygon, among others.
- **Direct On-Chain Storage:** Artworks are stored as base64-encoded data directly on the blockchain, guaranteeing the permanence and integrity of each piece.
- **Easy NFT Minting:** Simplified process for users to mint their pixel art as NFTs directly from their browser, without needing external wallets or complex procedures.
- **Artwork Showcase:** Users can view and share their minted NFTs, showcasing their creations to a broader audience.

## Technology Stack

- **Solidity:** Utilizes smart contracts for the creation and management of NFTs.
- **Truffle:** Offers a robust development environment for compiling, deploying, and managing Ethereum smart contracts.
- **React:** Powers the frontend for a dynamic, responsive user experience.
- **JavaScript:** The core programming language for developing the web app's logic and blockchain interactions.
- **Three.js:** Enhances pixel art by rendering it in 3D, offering a unique perspective on creations.
- **Symfony:** A powerful PHP framework used for developing the backend, providing API endpoints for managing user accounts, handling artwork data, and integrating with blockchain technologies.

## Getting Started

### Prerequisites

- Node.js and npm for the frontend.
- PHP and Composer for the Symfony backend.
- A web3 wallet extension, like MetaMask, for interacting with blockchain features.

### Setup

#### Frontend

1. **Clone the repository**

   ```
   git clone https://github.com/your-repository/on-chain-pixelart-nft-creator.git
   cd on-chain-pixelart-nft-creator
   ```

2. **Install frontend dependencies**

   ```
   npm install
   ```

3. **Start the React app**

   ```
   npm start
   ```

   This command launches the app in your browser for creating and minting pixel art NFTs.

#### Backend

1. **Set up the Symfony backend**

   Navigate to the backend directory and install dependencies:

   ```
   cd backend
   composer install
   ```

2. **Configure environment variables**

   Adjust the `.env` file to configure database connections and blockchain API access as needed.

3. **Start the Symfony server**

   ```
   symfony server:start
   ```

   This will start the backend server, which provides API services to the frontend application.

### How to Use

- **Design and Mint:** Create your pixel art using the canvas tools, then mint it as an NFT by clicking "Mint NFT" and selecting your blockchain.
- **Backend Integration:** The Symfony backend manages user accounts, stores non-blockchain-related data, and interacts with the blockchain to facilitate NFT minting.
- **View and Share:** Showcase your minted NFTs on your profile and share them across social platforms directly from the site.

## Contributions

Contributions, suggestions, and feedback are highly appreciated. Please feel free to create issues or submit pull requests on our GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Dive into the world of NFT creation with a tool that blends artistic freedom with the permanence of blockchain technology, all backed by the robustness of a Symfony-powered backend.
