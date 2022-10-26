# Voting dApp Client
School project using ReactJS and will be used to interact with dApp.

## Getting Started
1. Install yarn on your pc by going to [this link](https://classic.yarnpkg.com/lang/en/docs/install)
2. Clone the project 
```
git clone https://github.com/chetra-seng/voting-dapp-client.git
```
3. Install required dependencies for the project
```
yarn install
```
4. Start the project
```
yarn start
```

A react application will start at [localhost:3000](http://localhost:3000) assuming you have no other applications running on this port.

## Collaborating with our team
1. Clone the project
```
git clone https://github.com/chetra-seng/voting-dapp-client.git
```
2. Create a new branch with your name
```
git checkout -b your_name
```
3. Add your code
```
git add [your_files]
```
4. Commit your changes
```
git commit -m "Message about the changes your made"
```
5. Push your branch to remote repository
```
git push -u origin your_name
```
6. Create a pull request <br />
Go to GitHub and create pull request on our repository.

### Provide environment variables for react app
Create a file called `.env`, paste and saved the content below
```
REACT_APP_CHAIN_ID=195
REACT_APP_RPC_URL=https://rpc1.testnet.camdl.gov.kh
REACT_APP_BLOCK_EXPLORER=https://explorer.testnet.camdl.gov.kh/
```