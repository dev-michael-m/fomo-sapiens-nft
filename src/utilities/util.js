import { ethers } from "ethers";
import {collection, addDoc, getDocs, deleteDoc} from 'firebase/firestore';
import db from './../firebase/config';

const firebase_collection = collection(db,'whitelist');

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require('../contract-abi.json');

export const fomoContract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS)

export const FormatDropTimer = (date = new Date(), end_date = new Date()) => {
    try {
        const dateDiff = Math.floor((end_date.getTime() - date.getTime()) / (1000 * 3600 * 24));
        const hourDiff = Math.floor((end_date.getTime() - date.getTime()) / (1000 * 3600)) % 24;
        const minuteDiff = Math.floor((end_date.getTime() - date.getTime()) / (1000 * 60)) % 60;
        const secondDiff = Math.floor((end_date.getTime() - date.getTime()) / 1000) % 60;
        return {days: dateDiff > 0 ? dateDiff : '00', hours: hourDiff > 0 ? hourDiff.toString().padStart(2,'0') : '00', 
        minutes: minuteDiff > 0 ? minuteDiff.toString().padStart(2,'0') : '00', 
        seconds: secondDiff > 0 ? secondDiff.toString().padStart(2,'0') : '00', color: dateDiff <= 0 && hourDiff <= 0 && minuteDiff <= 10 ? '#28d5cc' : null,
        active: dateDiff <= 0 && hourDiff <= 0 && minuteDiff <= 0 && secondDiff <= 0 ? true : false}
    } catch (error) {
        console.error(error);
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            color: null,
            active: false
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
        const time = new Date(dateIn).toLocaleString('en-us',{hour: '2-digit', minute: '2-digit'}).split(' ')[0];

      return {
          day: day.trim(),
          date: date.trim(),
          month: month.trim(),
          year: year.trim(),
          time: time.trim()
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

export const MaskAddress = (full_address = '') => {
    try {
        const first_half = full_address.substring(0,5);
        const second_half = full_address.substring(full_address.length - 4);
        return `${first_half}...${second_half}`;
    } catch (error) {
        console.error(error);
    }
}

export const CheckAdmin = () => {
    return new Promise(async(resolve,reject) => {
        if(window.ethereum.request({method: 'eth_requestAccounts'})){
            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                
                if(address === process.env.REACT_APP_F1_ADDRESS){
                    resolve({status: 'success',msg: 'Verified'});
                }else{
                    reject({msg: `You do not have access to this page.`,status: 'error'})
                }
            }catch(error) {
                reject({msg: error, status: 'error'});
            }            
        }else{
            reject({msg: `You must connect your MetaMask wallet to be verified.`,status: 'warning'})
        }
    })
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
                    msg: 'Something went wrong. Try waiting a minute and try again.'
                })                
            }
        }else{
            reject({
                status: 'warning',
                msg: 'Wallet is not connected.  Please make sure to connect your wallet and try again.'
            })
        }
    })    
}

export const connectWalletSync = async () => {
    if(window.ethereum.request({method: 'eth_requestAccounts'})){
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            const eth = ethers.utils.formatEther(balance);

            return {
                address,
                balance,
                eth
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }else{
        console.warn('users wallet is not connected');
        return null;
    }
}

export const getTokensMinted = async (_address) => {
    return new Promise(async(resolve,reject) => {
        try{
            const minted = await fomoContract.methods.getMinted(_address).call({
                from: process.env.REACT_APP_F1_ADDRESS
            });

            resolve({
                status: 'success',
                msg: 'success',
                data: minted
            })
        }catch(error) {
            reject({
                status: 'error',
                msg: error
            })
        }
        
    })    
}

export const getSoldOut = async () => {
    return new Promise(async(resolve,reject) => {
        try {
            const minted = await fomoContract.methods._tokenIds().call();
            const max_supply = await fomoContract.methods.MAX_SUPPLY().call();
            const total_giveaways = await fomoContract.methods.GIVEAWAYS().call();

            resolve({
                status: 'success',
                msg: 'success',
                data: parseInt(minted) < (parseInt(max_supply) - parseInt(total_giveaways)) ? false : true
            })
        } catch (error) {
            reject({
                status: 'error',
                msg: error
            })
        }
    })
}

export const setSaleState = (active,sale_type) => {
    return new Promise(async(resolve,reject) => {
        try{
            if(window.ethereum.request({method: 'eth_requestAccounts'})){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                if(sale_type === 'presale'){
                    const status = await fomoContract.methods.setPresale(active).send({
                        from: address
                    })
                    resolve(status);
                }else if(sale_type === 'public'){
                    const status = await fomoContract.methods.setPublicSale(active).send({
                        from: address
                    })
                    resolve(status);
                }
            }else{
                reject({status: false})
            }
        } catch(error) {
            reject({status: false})
        }
    })        
}

export const pauseContract = (contractState) => {
    return new Promise(async(resolve,reject) => {
        try {
            const status = await fomoContract.methods.setPaused(contractState).send({
                from: process.env.REACT_APP_F1_ADDRESS
            })

            resolve({
                status: 'success',
                data: status
            })
        } catch (error) {
            console.error(`util.pauseContract: ${error}`);
            reject({
                status: 'error',
                msg: error
            })
        }
    })
}

export const getPaused = () => {
    return new Promise(async(resolve,reject) => {
        try {
            const paused = await fomoContract.methods.paused().call();

            resolve({
                status: 'success',
                data: paused
            })
        } catch (error) {
            console.error(`util.getPaused: ${error}`);
            reject({
                status: 'error',
                msg: error
            })
        }
    })
}

export const getPresaleState = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const active = await fomoContract.methods.presale_active().call();
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

export const getPublicState = () => {
    return new Promise(async(resolve,reject) => {
        try{
            const active = await fomoContract.methods.active().call();
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

const checkWhitelist = (signature, address) => {
    return new Promise(async(resolve,reject) => {
        try {
            const whitelisted = await fomoContract.methods.isWhitelisted(signature, address).call();
            resolve({
                status: true,
                data: whitelisted
            })
        } catch (error) {
            console.error(`util.checkWhitelist: ${error}`);
            reject({
                status: false,
                msg: error
            })
        }
    })
}

export const getMintPrice = () => {
    return new Promise(async(resolve,reject) => {
        try {
            const mint_price = await fomoContract.methods.SALE_PRICE().call();
            resolve({
                status: 'success',
                data: mint_price
            })
        } catch (error) {
            console.error(`util.getMintPrice: ${error}`);
            reject({
                status: 'error',
                msg: error
            })
        }
    })
}

export const getMaxMint = () => {
    return new Promise(async(resolve,reject) => {
        try {
            const max_mint = await fomoContract.methods.MAX_MINT().call();
            resolve({
                status: 'success',
                data: max_mint
            })
        } catch (error) {
            console.error(`util.getMintPrice: ${error}`);
            reject({
                status: 'error',
                msg: error
            })
        }
    })
}

export const updateWhitelist = (type, address) => {
    return new Promise(async(resolve,reject) => {
        try {
            const whitelisted = await getDocs(firebase_collection);

            const exists = whitelisted.docs.find(doc => address.toUpperCase() == doc.data().address.toUpperCase());
            
            if(type === 'add'){
                if(!exists){
                    const snapshot = await addDoc(firebase_collection,{
                        address: address
                    })
    
                    if(snapshot.id){
                        resolve({
                            status: 'success',
                            data: snapshot.id
                        })
                    }else {
                        reject({
                            status: 'error',
                            msg: 'There was an issue adding this address to the whitelist.  Please notify the developer of this issue.'
                        })
                    }
                }else{
                    reject({
                        status: 'warning',
                        msg: 'This address already exists in the whitelist'
                    })
                }               
            }else if(type === 'remove'){
                if(exists){
                    const snapshot = await deleteDoc(exists.ref);
                    resolve({
                        status: 'success',
                        data: true
                    })
                }else{
                    reject({
                        status: 'warning',
                        msg: 'Address doesn not exist in the whitelist'
                    })
                }
            }
        } catch (error) {
            console.error(`util.updateWhitelist: ${error}`);
            reject({
                status: 'error',
                msg: error
            })
        }
    })
}

export const mintNFT = async (sale_type, num_tokens) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(window.ethereum.request({method: 'eth_requestAccounts'})){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const price = await fomoContract.methods.SALE_PRICE().call();
                const mint_price = parseFloat(web3.utils.fromWei(price,'ether'));

                if(sale_type === 'presale'){
                    const presale_active = await getPresaleState();
                    const max_supply = await fomoContract.methods.MAX_SUPPLY().call();
                    const wl = await getDocs(firebase_collection);

                    const exists = wl.docs.find(doc => address.toUpperCase() == doc.data().address.toUpperCase());

                    if(presale_active && exists){
                        // second layer of verification to whitelist
                        const message = web3.eth.abi.encodeParameters(["address","uint256"],[address,max_supply]);
                        const {signature} = web3.eth.accounts.sign(message,PRIVATE_KEY);
                        //const whitelisted = await checkWhitelist(signature,address);
                       
                        const tx = {
                            from: address,
                            to: process.env.REACT_APP_CONTRACT_ADDRESS,
                            value: web3.utils.toHex(web3.utils.toWei(String((mint_price * num_tokens).toFixed(1)),'ether')),
                            data: fomoContract.methods.whitelistMint(signature,num_tokens).encodeABI(),
                        }

                        const txHash = await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [tx]
                        })

                        resolve({data: txHash});
                    }else{
                      reject({msg: `You are not currently on the whitelist.`, status: 'warning'})  
                    }
                }else if(sale_type === 'public'){
                    const public_active = await getPublicState();

                    if(public_active){
                        const tx = {
                            from: address,
                            to: process.env.REACT_APP_CONTRACT_ADDRESS,
                            value: web3.utils.toHex(web3.utils.toWei(String((mint_price * num_tokens).toFixed(1)),'ether')),
                            data: fomoContract.methods.mint(num_tokens).encodeABI(),
                        }

                        const txHash = await window.ethereum.request({
                            method: 'eth_sendTransaction',
                            params: [tx]
                        })

                        resolve({data: txHash});
                        
                    }else{
                        reject({msg: `Public sale is currently inactive.`, status: 'warning'})
                    }
                }else{
                    reject({msg: `Sale is currently inactive.`, status: 'warning'})
                }                
            }else{
                reject({
                    status: 'warning',
                    msg: `You must connect your MetaMask wallet to continue.  If you don't have a Metamask wallet, follow this link to get started LINK`
                })
            }    
        } catch (error) {
            console.error(`util.mintNFT: ${error}`)
            reject({
                status: 'error',
                msg: error.message
            })
        }
    })
    
  }