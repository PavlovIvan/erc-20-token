# erc-20-token
Simple educational ERC-20 token                                                                                                 
      
#### Clone test ```erc-20-token``` repo
```     
git clone https://github.com/PavlovIvan/erc-20-token.git
cd erc-20-token
npm install hardhat
npm install
```        
#### Make tests run
```     
npx hardhat test
npx hardhat coverage
```

#### Deploy local
```
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
```

#### Deploy rinkeby
Create in the root of your project a ```.env``` file:
```
RENKEBY_URL=https://eth-rinkeby.alchemyapi.io/v2/<YOUR_ALCHEMY_APP_ID>
PRIVATE_KEY=<YOUR_BURNER_WALLET_PRIVATE_KEY>
```

```
npx hardhat run --network rinkeby scripts/deploy.js
```
