import { ethers } from "ethers";

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require('../contract-abi.json');
const contractAddress = "0x3F2701C84989CcfECA0480aa4484295A7D060962";
const SAPIEN_PRICE = 100000000000;

export const fomoContract = new web3.eth.Contract(contractABI, contractAddress)

export const FormatDropTimer = (date = new Date(), end_date = new Date()) => {
    try {
        const dateDiff = Math.floor((end_date.getTime() - date.getTime()) / (1000 * 3600 * 24));
        const hourDiff = Math.floor((end_date.getTime() - date.getTime()) / (1000 * 3600)) % 24;
        const minuteDiff = Math.floor((end_date.getTime() - date.getTime()) / (1000 * 60)) % 60;
        const secondDiff = Math.floor((end_date.getTime() - date.getTime()) / 1000) % 60;
        return {days: dateDiff, hours: hourDiff.toString().padStart(2,'0'), minutes: minuteDiff.toString().padStart(2,'0'), seconds: secondDiff.toString().padStart(2,'0')}
    } catch (error) {
        console.error(error);
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
}

export const DateDifference = (date = new Date(), end_date = new Date()) => {
    try {
        return Math.floor((end_date.getTime() - date.getTime()) / (1000 * 3600 * 24));
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const FormatDropDate = (dateIn = '') => {
    try {
        const date_str = new Date(dateIn).toLocaleString('en-us',{weekday: 'long', day: '2-digit', year: 'numeric' })
        const month = new Date(dateIn).toLocaleString('en-us',{month: 'short'});
        const [date,day,year] = date_str.split(' ');

      return {
          day: day.trim(),
          date: date.trim(),
          month: month.trim(),
          year: year.trim(),
          time: ''
      } 
    } catch (error) {
        console.error(error);
        return {
            day: '',
            date: '',
            month: '',
            year: '',
            time: '',
        }
    }
}

const MaskAddress = (full_address = '') => {
    try {
        const first_half = full_address.substring(0,5);
        const second_half = full_address.substring(full_address.length - 4);
        return `${first_half}...${second_half}`;
    } catch (error) {
        console.error(error);
    }
}

//* Web3 Contract Interactive Methods

export const ConnectWallet = async () => {
    return new Promise(async(resolve,reject) => {
        if(window.ethereum.request({method: 'eth_requestAccounts'})){
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const balance = await provider.getBalance(address);
                const eth = ethers.utils.formatEther(balance);
                resolve({
                    status: true,
                    address: address,
                    balance: eth,
                    address_snippet: MaskAddress(address)
                })
            } catch (error) {
                console.error(error);
                reject({
                    status: false,
                    msg: 'You must connect your Metamask wallet to continue.'
                })                
            }
        }else{
            reject({
                status: false,
                msg: `You must connect your MetaMask wallet to continue.  If you don't have a Metamask wallet, follow this link to get started LINK`
            })
        }
    })    
}

export const tokensMinted = async () => {
    const minted = await fomoContract.methods.getTokensMinted().call();
    return minted;
}

const checkTokenExists = async (tokenId) => {
    return new Promise(async(resolve,reject) => {
        try {
            const exists = await fomoContract.methods.tokenExists(tokenId).call();
            resolve({
                status: true,
                exists: exists
            })
        } catch (error) {
            console.error(`util.tokenExists: ${error}`);
            reject({
                status: false,
                msg: error
            })
        }
    })    
}

export const mintNFT = async () => {
    return new Promise(async(resolve,reject) => {
        try {
            if(window.ethereum.request({method: 'eth_requestAccounts'})){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                console.log({address});
                // errors here
                //const nonce = await web3.eth.getTransactionCount(address, "latest") //get latest nonce
                const tokenId = Math.ceil(Math.random() * 2000 + 1);  // get tokenid
              
                console.log({address,tokenId})
                await checkTokenExists(tokenId).then(async(status) => {
                    if(status.status){
                        if(!status.exists){
                            // get tokenURI based on tokenId
                            const tokenURI = "https://gateway.pinata.cloud/ipfs/Qmd6d3s56nt8yunDLEcofLY7ytm5EUGPCzE2QWgdnAGPqT";
                            //the transaction
                            const tx = {
                                from: address,
                                to: contractAddress,
                                value: '0x174876E800',
                                gas: '0x7A120',
                                data: fomoContract.methods.mintSapien(address, tokenURI, tokenId).encodeABI(),
                            }
                        
                            const txHash = await window.ethereum.request({
                                method: 'eth_sendTransaction',
                                params: [tx]
                            })
                        
                            console.log({txHash})
                            resolve({
                                status: true,
                                txn: txHash
                            });
                        }else{
                            console.log('token already exists.')
                        }
                    }
                }).catch(error => {
                    console.error(`util.mintNFT.tokenExists: ${error}`)
                    reject({
                        status: false,
                        msg: error
                    })
                })
            }else{
                reject({
                    status: false,
                    msg: `You must connect your MetaMask wallet to continue.  If you don't have a Metamask wallet, follow this link to get started LINK`
                })
            }    
        } catch (error) {
            console.error(`util.mintNFT: ${error}`)
            reject({
                status: false,
                msg: error
            })
        }
        
        
      
        // const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
        // signPromise
        //   .then((signedTx) => {
        //     web3.eth.sendSignedTransaction(
        //       signedTx.rawTransaction,
        //       (err, hash) => {
        //         if (!err) {
        //           console.log(
        //             "The hash of your transaction is: ",
        //             hash,
        //             "\nCheck Alchemy's Mempool to view the status of your transaction!"
        //           )
        //         } else {
        //           console.log(
        //             "Something went wrong when submitting your transaction:",
        //             err
        //           )
        //         }
        //       }
        //     )
        //   })
        //   .catch((err) => {
        //     console.log("Promise failed:", err)
        //   })
    })
    
  }