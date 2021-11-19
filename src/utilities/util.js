import { ethers } from "ethers";

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require('../contract-abi.json');
const contractAddress = "0x7469585c3f9D7D33671780c2A682F6A8c2ec3F23";
const SAPIEN_PRICE = '0x16345785D8A0000' //100000000000000000 wei;

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
                    status: 'success',
                    msg: 'Wallet connected',
                    address: address,
                    balance: eth,
                    address_snippet: MaskAddress(address)
                })
            } catch (error) {
                console.error(error);
                reject({
                    status: 'error',
                    msg: error
                })                
            }
        }
    })    
}

export const tokensMinted = async () => {
    const minted = await fomoContract.methods.getTokensMinted().call();
    return minted;
}

export const setSaleActive = async (active) => {
    if(window.ethereum.request({method: 'eth_requestAccounts'})){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const status = await fomoContract.methods.setActive(active).send({
            from: address
        })

        console.log({status})

        return status;
    }    
}
const getSaleActive = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const active = await fomoContract.methods.getActive().call();
            resolve({
                status: true,
                active: active
            });
        } catch(error){
            console.error(`util.getSaleActive: ${error}`);
            reject({
                status: false,
                msg: error
            });
        }
    })
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
                const active = await getSaleActive();
                if(active.active){
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
                                    value: SAPIEN_PRICE,
                                    gas: '0x7A120',
                                    data: fomoContract.methods.mintSapien(address, tokenURI, tokenId).encodeABI(),
                                }
                            
                                const txHash = await window.ethereum.request({
                                    method: 'eth_sendTransaction',
                                    params: [tx]
                                })
                            
                                console.log({txHash})
                                resolve({
                                    status: 'success',
                                    msg: 'NFT minted successfully',
                                    payload: txHash
                                });
                            }else{
                                console.log('token already exists.')
                            }
                        }
                    }).catch(error => {
                        console.error(`util.mintNFT.tokenExists: ${error}`)
                        resolve({
                            status: 'error',
                            msg: error
                        })
                    })
                }else{
                    console.warn('Sale is currently inactive');
                    resolve({
                        status: 'warning',
                        msg: 'Sale is currently inactive'
                    })
                }                
            }else{
                resolve({
                    status: 'warning',
                    msg: `You must connect your MetaMask wallet to continue.  If you don't have a Metamask wallet, follow this link to get started LINK`
                })
            }    
        } catch (error) {
            console.error(`util.mintNFT: ${error}`)
            resolve({
                status: 'error',
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