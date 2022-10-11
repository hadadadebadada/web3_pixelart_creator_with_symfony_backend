
export function getAllNFTs() {
    return fetch('http://localhost:8000/api/nft_datas')
        .then(response => {return response.json();})
    // .then((data) => console.log(data));
}


export function getNFT(id) {
    return fetch(`http://localhost:8000/api/nft_datas/`+ id)
        .then(response => {return response.json();})
    // .then((data) => console.log(data));
}


export function createNFTData(nftData) {
    return fetch('http://localhost:8000/api/nft_datas', {
        method: 'POST',
        body: `{"name": "${nftData}"}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

