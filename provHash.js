const md5 = require('crypto-js/md5');
const fs = require('fs');

async function runProvenance(){
    let imgHash = [];
    console.log('running...')
    for(let i = 0; i < 10; i++){
        const path = `./nfts/assets/${i+1}.png`;
        const data = fs.readFileSync(path,'utf-8');
        const hash = md5(data).toString();
        console.log(`tokenID: ${i+1} | ${hash}`);
        imgHash.push(hash);
    }

    const concatHash = imgHash.join().replace(/,/g,"");
    console.log(`concatenated: ${concatHash}`);
    const provenance = md5(concatHash).toString();
    console.log(`provenance hash: ${provenance}`);
}


runProvenance();
