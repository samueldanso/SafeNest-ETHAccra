# SafeNest - Web3 Smart Savings Platform for Children

![](./banner.png) // change banner

<h4 align="center">
<a href="https://smartsaver.gitbook.io/smartsaver/">Documentation</a>
</h4>

## Overview

Netsafe is a Web3-based savings platform designed to help parents in high-inflation economies secure their children's financial future. By using blockchain technology and stablecoins, Netsafe ensures that savings are protected from inflation and can only be accessed by the child when they turn 18. Our platform is easy to use, combining advanced technology with a user-friendly interface to make saving both simple and secure.

## Features

-   **Seamless Onboarding**: Quick account creation for children using email or social logins.
-   **Time-Locked Savings**: Funds are securely locked until the child turns 18, ensuring long-term savings.
-   **Savings Goals**: Set and track progress toward specific financial objectives like "New Bike" or "College Fund".
-   **Emergency Withdrawals**: Allows access to funds in urgent situations with proper authorization.
-   **User-Friendly Interface**: Intuitive design for easy navigation and management of savings.
-   **Stablecoin Integration**: Utilizes stablecoins to protect savings against inflation.

## Technologies Used

### Frontend

-   **React** and **Next.js**: For building a responsive and dynamic user interface.
-   **Tailwind CSS**: For efficient and customizable styling.

### Smart Contracts

-   **Solidity**: Smart contract development language.
-   **Foundry**: Development framework for testing and deployment.

### Blockchain Integration

-   **The Graph**: For efficient blockchain data indexing and querying.
-   **Optimism**: Deployed on the OP Sepolia testnet.
-   **Lisk**: Deployed on the Lisk Sepolia testnet.
-   **Dynamic**: Implementing social login functionality.

## How It Works

Netsafe leverages blockchain technology to create a secure and transparent savings platform:

1. **Account Creation**: Parents can easily create accounts for their children using email or social logins, powered by Dynamic for a seamless onboarding experience.

2. **Time-Locked Savings**: Our smart contracts implement a timelock mechanism that restricts access to funds until the child turns 18. This is achieved through:

    - Storing the child's birth date securely on-chain.
    - Implementing time-based conditions in the withdrawal functions.

3. **Savings Goals**: Parents can set specific savings goals within the platform. The smart contract tracks contributions and calculates progress toward each goal.

4. **Stablecoin Integration**: To combat inflation, all savings are stored in stablecoins. This provides a stable value over time, protecting the savings from currency fluctuations.

5. **Emergency Withdrawals**: A carefully designed authorization system allows for emergency withdrawals. This involves:
    - Multi-signature approval process.
    - Timelocks to prevent immediate withdrawals.
    - Logging of withdrawal reasons for transparency.

## Smart Contract Implementation

Our smart contracts form the backbone of Netsafe's functionality:

| Contract     | Description                                            | Optimism Sepolia (CA)                      | Lisk Sepolia (CA)                          |
| ------------ | ------------------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| SafeNest.sol | Main contract handling savings, goals, and withdrawals | 0x939Dc4B20BAB0F0786F88273c08F620E085285eC | 0x939Dc4B20BAB0F0786F88273c08F620E085285eC |

The `SafeNest.sol` contract includes:

-   Functions for depositing and withdrawing funds.
-   Logic for setting and tracking savings goals.
-   Time-lock mechanisms for fund protection.
-   Emergency withdrawal protocols with proper authorization checks.

## Requirements

Before you begin, you need to install the following tools:

-   [Node (>= v18.17)](https://nodejs.org/en/download/)
-   Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
-   [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

**What's next**:

-   Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
-   Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
-   Edit your deployment scripts in `packages/hardhat/deploy`
-   Edit your smart contract test in: `packages/hardhat/test`. To run test use `yarn hardhat:test`
-

## 🚀 Setup The Graph Integration

Now that we have spun up our blockchain, started our frontend application and deployed our smart contract, we can start setting up our subgraph and utilize The Graph!

> Before following these steps be sure Docker is running!

#### ✅ Step 1: Clean up any old data and spin up our docker containers ✅

First run the following to clean up any old data. Do this if you need to reset everything.

```
yarn clean-node
```

> We can now spin up a graph node by running the following command… 🧑‍🚀

```
yarn run-node
```

This will spin up all the containers for The Graph using docker-compose. You will want to keep this window open at all times so that you can see log output from Docker.

> As stated before, be sure to keep this window open so that you can see any log output from Docker. 🔎

> NOTE FOR LINUX USERS: If you are running Linux you will need some additional changes to the project.

##### Linux Only

**For hardhat**

Update your package.json in packages/hardhat with the following command line option for the hardhat chain.

```
"chain": "hardhat node --network hardhat --no-deploy --hostname 0.0.0.0"
```

**For foundry**

Update your package.json in packages/foundry with the following command line option for the anvil chain.

```
"chain": "anvil --host 0.0.0.0 --config-out localhost.json",
```

Save the file and then restart your chain in its original window.

```
yarn chain
```

Redeploy your smart contracts.

```
yarn deploy
```

You might also need to add a firewall exception for port 8432. As an example for Ubuntu... run the following command.

```
sudo ufw allow 8545/tcp
```

#### ✅ Step 2: Create and ship our subgraph ✅

Now we can open up a fifth window to finish setting up The Graph. 😅 In this fifth window we will create our local subgraph!

> Note: You will only need to do this once.

```
yarn local-create
```

> You should see some output stating your subgraph has been created along with a log output on your graph-node inside docker.

Next we will ship our subgraph! You will need to give your subgraph a version after executing this command. (e.g. 0.0.1).

```
yarn local-ship
```

> This command does the following all in one… 🚀🚀🚀

- Copies the contracts ABI from the hardhat/deployments folder
- Generates the networks.json file
- Generates AssemblyScript types from the subgraph schema and the contract ABIs.
- Compiles and checks the mapping functions.
- … and deploy a local subgraph!

> If you get an error ts-node you can install it with the following command

```
npm install -g ts-node
```

You should get a build completed output along with the address of your Subgraph endpoint.

```
Build completed: QmYdGWsVSUYTd1dJnqn84kJkDggc2GD9RZWK5xLVEMB9iP

Deployed to http://localhost:8000/subgraphs/name/scaffold-eth/your-contract/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/scaffold-eth/your-contract
```

#### ✅ Step 3: Test your Subgraph ✅

Go ahead and head over to your subgraph endpoint and take a look!

> Here is an example query…

```
  {
    greetings(first: 25, orderBy: createdAt, orderDirection: desc) {
      id
      greeting
      premium
      value
      createdAt
      sender {
        address
        greetingCount
      }
    }
  }
```

> If all is well and you’ve sent a transaction to your smart contract then you will see a similar data output!

#### ✅ Side Quest: Run a Matchstick Test ✅

Matchstick is a [unit testing framework](https://thegraph.com/docs/en/developing/unit-testing-framework/), developed by [LimeChain](https://limechain.tech/), that enables subgraph developers to test their mapping logic in a sandboxed environment and deploy their subgraphs with confidence!

The project comes with a pre-written test located in `packages/subgraph/tests/asserts.test.ts`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
