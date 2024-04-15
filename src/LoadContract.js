import contractABI from "./GiveABI.json";
import Web3 from "web3";
const contractAddress = "0x197f88998182226D5138968C4Ec1ae3E07EfF1f8"; // Sepolia

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        window.web3.eth.requestAccounts().then((accounts) => {
            window.web3.eth.defaultAccount = accounts[0];
            console.log(accounts[0]);
            console.log(window.web3.eth.defaultAccount);
        });
    } else {
        console.error("Web3 provider not found");
    }
}

async function load() {
    return await new window.web3.eth.Contract(contractABI, contractAddress);
}

export default async function loadContract() {
    try {
        await loadWeb3();
        window.contract = await load();
        const name = await window.contract.methods.name().call();
        const symbol = await window.contract.methods.symbol().call();
        const totalSupply = await window.contract.methods.totalSupply().call();
        const balance = await window.contract.methods
            .balanceOf(window.web3.eth.defaultAccount)
            .call();
        console.log(name, symbol, totalSupply.toString(), balance.toString());
    } catch (error) {
        console.error("Error loading contract:", error);
    }
}
