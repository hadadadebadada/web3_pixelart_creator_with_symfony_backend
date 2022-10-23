import React, {Component} from 'react'
import "./Pixelart.css"
import html2canvas from "html2canvas"
import OnChainNFTContract from "./OnChainNFT.json"
import getWeb3 from "../../../getWeb3";
import styled from "styled-components";
import ConnectWalletModal from "../../general/connectWalletModal";
import Base64decoder from "../../general/base64decoder";

export function getAllNFTs() {
    return fetch('/api/nft_datas.json')
        .then(response => {
            return response.json();
        })
        .then((data) => console.log(data));
}


export function getNFT(id) {
    return fetch(`/api/nft_datas/${id}`)
        .then(response => {
            return response.json();
        })
        .then((data) => console.log(data));
}


export function createNFTData(nftData) {
    return fetch('/api/nft_datas', {
        method: 'POST',
        body: `{"name": "${nftData}"}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


const Button2 = styled.button`
  display: inline-block;
  color: palevioletred;
  background: yellow;
  font-size: 5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
  &:hover {
    color: orange; 
    background: black;}

    @media screen and (max-width: 960px) {
      font-size: 3em;

    }

`;
const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  width:35%;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
  &:hover {
    color: orange; 
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

class Pixelart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colorPicker: "#ffffff",
            width: window.innerWidth,
            height: window.innerHeight,
            web3: null,
            accounts: null,
            contract: null,
            image: "",
            name: "",
            description: "",
            connectWallet: null
        };

        this.width = this.updateDimensions.bind(this)
        this.height = this.updateDimensions.bind(this)
        this.web3 = this.componentDidMount.bind(this);
        this.accounts = this.componentDidMount.bind(this);
        this.contract = this.componentDidMount.bind(this);
        this.connectWallet = this.connect.bind(this);
        //this.name = this.getInput(this);
       // this.description = this.getDescription().bind(this);
    }

    componentDidMount = async () => {

        try {

            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = OnChainNFTContract.networks[networkId];
            const instance = new web3.eth.Contract(
                OnChainNFTContract.abi,
                deployedNetwork && deployedNetwork.address,
            );


            this.setState({web3, accounts, contract: instance}, /* this.runExample */);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }


        let draw = false
        let container = document.querySelector('.container')
        let size = 32
        const color = document.querySelector('.color')
        let resetBtn = document.querySelector('#btn')
        let eraserBtn = document.querySelector('#eraserBtn')

        this.setState({colorPicker: color.value, width: window.innerWidth, height: window.innerHeight}, () => {

            function populate(size) {


                container.style.setProperty('--size', size);

                for (let i = 0; i < size * size; i++) {
                    let div = document.createElement('div')
                    div.classList.add('pixel')

                    let colorPicker = getComputedStyle(div)
                        .getPropertyValue('--main-bg-color');

                    div.addEventListener('mouseover', function () {
                        div.style.setProperty("--main-bg-color", color.value);
                        if (!draw) return
                        div.style.backgroundColor = color.value
                        div.style.setProperty("--main-bg-color", color.value);
                        div.style.setProperty("--pixel-bg-color", color.value);
                    })

                    div.addEventListener('mouseover', function () {

                        if (getComputedStyle(div)
                            .getPropertyValue('--pixel-bg-color') !== getComputedStyle(div)
                            .getPropertyValue('--main-bg-color')) return
                        div.style.backgroundColor = colorPicker;
                    })

                    div.addEventListener('mousedown', function () {
                        div.style.backgroundColor = color.value
                        div.style.setProperty("--main-bg-color", color.value);

                    })


                    container.appendChild(div)
                }
            }

            window.addEventListener("mousedown", function () {
                draw = true
            })
            window.addEventListener("mouseup", function () {
                draw = false
            })


            function reset() {
                container.innerHTML = ''
                populate(size)
            }

            function setColorWhite() {
                color.value = "#ffffff"
            }

            resetBtn.addEventListener('click', reset)
            eraserBtn.addEventListener('click', setColorWhite)

            populate(size);

        });
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };


    connect = async () => {

        const {contract} = this.state;
        contract.methods.tokenURI(1).call().then((res) => {
            let substringRes = res.substring(29);
            let c = Base64decoder(substringRes)
            let jsonObj = JSON.parse(c);
            console.log(jsonObj.image_data)
            //muss nur noch in state gespeichert werden
        }).catch((err) => {
            console.log(err);
        });
        // 1. json to string
        // 2. img data from json
        //https://stackoverflow.com/questions/55028583/how-do-i-call-setstate-from-another-component-in-reactjs
        //zusätzlich state connectwallet
        this.setState({connectWallet: <ConnectWalletModal></ConnectWalletModal>})
    }


    getInput = async () => {
        let input = await document.getElementById("input").value
        this.setState({name: input});
    }

    getDescription = async () => {
        let myDescription = await document.getElementById("input2").value
        this.setState({description: myDescription});
    }


    mintPicture = async () => {

        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                this.setState({accounts: accounts});
                console.log(accounts[0])
                alert(accounts[0])
            } catch (error) {
                if (error.code === 4001) {
                    // User rejected request
                    alert("User rejected request")
                }
                console.log(error);
            }
        }


        try {

            const {accounts, contract, web3} = this.state;
            const container = document.querySelector("#container");
            container.style.height = "200px";
            container.style.width = "200px";


            //alert("connedted to: ",web3.eth.getAccounts()    );
            html2canvas(container).then((canvas) => {
                let input = document.getElementById("input").value
                let description = document.getElementById("input2").value
              console.log("called minting: ", description)

                this.setState({image: canvas.toDataURL(), name: input, description: description}, () => {
                    let picString = this.state.image
                    //console.log(picString)


                    try {
                        const input = document.querySelector('input');
                        const input2 = document.getElementById('input2');

                        const log = document.getElementById('values');

                        input.addEventListener('input', updateValue);
                        input2.addEventListener('input2', updateValue);

                        function updateValue(e) {
                            log.textContent = e.target.value;
                        }

                        let name = this.state.name
                        let description = this.state.description


                        // true --> png für rarible // false -> svg für openseaa
                        const x = true;
                        contract.methods.mint(x, name, description, picString).send({
                            from: accounts[0],
                            value: 1000000000000000,
                            picString
                        }) // value in wei
                            .then(function (receipt) {
                                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                                alert("picture minted!")
                                //safe pic to api
                                console.log(receipt)

                            })
                            .then(createNFTData(picString))

                        ;
                    } catch (error) {
                        alert("minting failed")
                        console.log(error);

                    }
                    ;

                });
                container.style.height = "800px";
                container.style.width = "800px";
                // web3.eth.sendTransaction({from:accounts[0], to:'0x433a69a3F84FbfcF32694f871ebd92046Af39ceD', value: web3.toWei(5, "ether"), gas:100000});
            });
        } catch (error) {
            alert("please connect to metamask")
        }
        ;


    }


    render() {

        let myWidth = this.state.width * 0.95


        let name = this.state.name
        let description = this.state.description

        return <div className="Appi">

            <div className="navbar" style={{backgroundColor: "#101522"}}>
                <button id="btn"
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded">
                    <p style={{fontWeight: 'bold', fontSize: '200%'}}>Reset</p></button>
                <div style={{width: '30px'}}></div>
                <button id="eraserBtn"
                        class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded">
                    <p style={{fontWeight: 'bold', fontSize: '200%'}}>Eraser</p></button>
                <input type="color" valueDefault="#00eeff" id="color" class="color"></input>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={this.connect}>Connect another Wallet
                </button>
                {this.state.connectWallet}
                {/* {account != null ? <h1>Connected to Wallet: {account}</h1>: <h1>Wallet not connected</h1>} */}
            </div>


            <p>{this.state.width < 800 ? (
                <div style={{height: myWidth, width: myWidth}} className="container" id="container"></div>
            ) : <div style={{height: "800px", width: "800px"}} className="container" id="container"></div>}
            </p>

            <div style={{height: 100}}></div>

            <input  id="input" value={name} type="text" onChange={this.getInput}
                   placeholder="Name your NFT-Artwork"/>
          <div style={{height: 50}}></div>


          <textarea
              style={{width: "30%"}}
              value={description}
              id="input2"
              rows={4}
              onChange={this.getDescription}

              placeholder="Give your Artwork a description"
          />

            <Button2 onClick={this.mintPicture}>Mint your artwork</Button2>

        </div>;

    }
}

export default Pixelart;