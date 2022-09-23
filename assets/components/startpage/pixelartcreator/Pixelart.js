import React, { Component } from 'react'
import "./Pixelart.css"
import html2canvas from "html2canvas"
import OnChainNFTContract from "./OnChainNFT.json"
import getWeb3 from "../../../getWeb3";
import styled from "styled-components";

const Button2 = styled.button`
  display: inline-block;
  color: palevioletred;
  background: yellow;
  font-size: 10em;
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
      image: ""
    };

    this.width = this.updateDimensions.bind(this)
    this.height = this.updateDimensions.bind(this)
    this.web3 = this.componentDidMount.bind(this);
    this.accounts = this.componentDidMount.bind(this);
    this.contract = this.componentDidMount.bind(this);

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

      // instance.methods.tokenURI(1).call()
      // .then(res => {
      //   console.log(res);
      // });

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, /* this.runExample */);

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

    this.setState({ colorPicker: color.value, width: window.innerWidth, height: window.innerHeight }, () => {

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
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };


  connect = async () => {

    
/*     if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({accounts: accounts});
        alert( accounts)
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }
    
        console.log(error);
      }
    } */

  }

  mintPicture = async () => {

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({accounts: accounts});
        console.log(accounts[0])
        alert(accounts[0])
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
        }
    
        console.log(error);
      }
    }

  

    try{ 
     
    const { accounts, contract, web3 } = this.state;
    const container = document.querySelector("#container");
    container.style.height = "200px";
    container.style.width = "200px";

/*     async function doSomething() {
      let result = await web3.eth.getAccounts()
      .then((response) => 
      
      this.setState({accounts:response})
      )
      return result ;
    }

    doSomething();
    alert("connected to account: " ,this.state.accounts[0]) */

    //alert("connedted to: ",web3.eth.getAccounts()    );
    html2canvas(container).then((canvas) => {
      this.setState({ image: canvas.toDataURL() }, () => {
        let picString = this.state.image
        console.log(picString)

        try{        
        contract.methods.mint(picString).send({ from: accounts[0], value: 1000000000000000, picString }) // value in wei
        .then(function (receipt) {
          // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
          alert("picture minted!")
          //safe pic to api
          console.log(receipt)
        });}catch(error){
          alert("please connect to metamask")
          console.log(error);

        };

      });
      container.style.height = "800px";
      container.style.width = "800px";
      // web3.eth.sendTransaction({from:accounts[0], to:'0x433a69a3F84FbfcF32694f871ebd92046Af39ceD', value: web3.toWei(5, "ether"), gas:100000});
    });}catch(error){
      alert("please connect to metamask")
    };
   




  }



  render() {

    let myWidth = this.state.width * 0.95

    return <div className="Appi">

      <div className="navbar" style={{ backgroundColor: "#101522" }}>
        <button id="btn" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded"><p style={{ fontWeight: 'bold', fontSize: '200%' }}>Reset</p></button>
        <div style={{ width: '30px' }}></div>
        <button id="eraserBtn" class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded"><p style={{ fontWeight: 'bold', fontSize: '200%' }}>Eraser</p></button>
        <input type="color" valueDefault="#00eeff" id="color" class="color"></input>
        <button onClick={this.connect}>Connect Wallet</button>
        {/* {account != null ? <h1>Connected to Wallet: {account}</h1>: <h1>Wallet not connected</h1>} */}
      </div>


      <p>{this.state.width < 800 ? (
        <div style={{ height: myWidth, width: myWidth }} className="container" id="container"></div>
      ) : <div style={{ height: "800px", width: "800px" }} className="container" id="container"></div>}
      </p>

      <div style={{ height: "100px" }}></div>

      <Input type="text" placeholder="Name your NFT" />
      <Input type="text" placeholder="Give your NFT a description" />
      <Button2 onClick={this.mintPicture}>Mint your artwork</Button2>

    </div>;

  }
}

export default Pixelart;
