import React, { Component } from 'react'
import "./Pixelart.css"
import html2canvas from "html2canvas"
import OnChainNFTContract from "./OnChainNFT.json"
import getWeb3 from "../../../getWeb3";
import styled from "styled-components";
import ConnectWalletModal from "../../general/connectWalletModal";
import Base64decoder from "../../general/base64decoder";

export function getAllNFTs() {
  return fetch('/api/nft_datas.json')
      .then(response => {return response.json();})
      .then((data) => console.log(data));
}


export function getNFT(id) {
  return fetch(`/api/nft_datas/${id}`)
      .then(response => {return response.json();})
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
      image: "",
      name:"",
      connectWallet:null
    };

    this.width = this.updateDimensions.bind(this)
    this.height = this.updateDimensions.bind(this)
    this.web3 = this.componentDidMount.bind(this);
    this.accounts = this.componentDidMount.bind(this);
    this.contract = this.componentDidMount.bind(this);
    this.connectWallet = this.connect.bind(this);
    //this.name = this.getInput(this);
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

    const {  contract } = this.state;




    contract.methods.tokenURI(1).call().then((res) => {
      console.log(res);
      let substringRes = res.substring(29);
      // var b = Buffer.from('eyJuYW1lIjogIiIsImltYWdlX2RhdGEiOiAiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFKWUFBQUNXQ0FZQUFBQThBWEhpQUFBQUFYTlNSMElBcnM0YzZRQUFCd05KUkVGVWVGN3RuVTlJRlYwWXhsK1Z1RmFLSnQ0aXBZVi9GaWE2TUdyanFvZ1d3bDI0VWd3aVFxRUUzWlhvSWxxa21GQ2JDTnkwS0VnUU55NWE2TUpOdFBGUEM0TzdDSUpXbDRpODRNYXNSZVhIOGF2aGpsLzFYYnB6WnQ3bm5PZUFLMmZPKzd6UDgvUGNZWnk1cDJ4dmIyOVBPT2hBeEE2VUVheUlIZVYwK3c0UUxJSmd4UUdDWmNWV1RrcXd5SUFWQndpV0ZWczVLY0dLbUlGWHIxNkZaang2OUtpY1BuMDY0aXI2cHlOWUVXZDA4dVJKK2ZEaFF6RHI3T3lzM0xoeEkrSXErcWNqV0JGblJMRCtOWlJnRWF5SUhTQllWZ3psaWtXd3JJQ1Z5K1hrKy9mdndkekhqaDJUNnVwcUs3VnNUam93TUJDYXZydTdXMFpIUjRzdXlZL0NvcTN5NjhCVHAwNkorU1A1T1I0K2ZFaXcvRUxBVHJjRXk0NnYzczhLQ1ZiaEV2c3p3U05IamtoZFhSMVVvTC9xSTVWS1NUcWQvbU1mQjgrcnFLZ1FjOUd2YVdReUdmbjQ4V01nNmViTm05TFgxMWUweEVTdXNlN2R1eWNURXhNaGtkKytmWlB5OHZLaWhXczQ4TUdEQjJJTUx4ekY5TkhWMVNXYm01dkJhV05qWXpJek02T2hwY2cwRUt3U3JMeC8vNzdjdW5XTFlQM0NRNEpGc0VwdzRQZW5FcXdTYk9XS3BReXNrWkVSeVdheklWWFBueitIdTVGb0xzSzN0clpDZlhSMGRNaWhRNGYraU91Yk4yL2s4K2ZQd1RFblRweVFob2FHRWhDM2YrcjgvTHlzcmEyRkNvMlBqNHZSL3F2QkZjdCtKazVVTUdBZHZCdS9zN01qNXJFZ2d1VkV4TWswUWJDUzhkMzVxaEJnbVl2ZTI3ZHZoOEw0OU9rVDNIMHM1MmtxYUhCaFlVR3VYcjBhYWptZnordjZLUFFwRUY5N1RlVGkzVmV6ZmVxYllQbVVkb3k5RXF3WXpmYXBGTUh5S2UwWWV5VllNWnJ0VXltQzVWUGFNZlpLc0dJMDI2ZFNCTXVudEdQczFUbXdMbDI2RkhvNjgrTEZpMkwrSGNFUnJ3Tk9ncld5c2hLNDJOL2ZUN0RpWldxL0dzRkt3SFFmU2hJc0gxSk9vRWZud0ZwYVdwTDM3OThIVmpZM044dUZDeGNTc05idmtzNkI1WGVjZXJvbldIcXljRW9Kd1hJcVRqM05FQ3c5V1RpbGhHQTVGV2R4elhSMmRvWU92SHYzcnZUMjloWjNjcEZIRWF3aWpYTHBNUFBlNDlldlg0T1dGaGNYQ1paTEFTZlZDOEZLeW5uSDZ4SXN4d05PcXIwN2QrNkV2aWYxOHVYTGtXOXl3R3VzcE5KMXZDN0JjanpncE5valdFazU3M2hkZ3VWNHdFbTFSN0JFOWpkVnVuTGxTaWlENmVscE9YdjJiRks1d05jbFdEL0FPdml0eFJzYkd3U3JCTHdKMW0vQVdsOWZsM1BuenBWZ3JkK25FaXlDWmVVdmdHQ0p5UGIydGd3UEQ0Y01ucHFha3BhV0ZpdW0rekFwd2ZJaDVRUjZKRmdKbU81RFNZTGxROG9KOUVpd0VqRGRoNUlFUzBISzVzM3RwMCtmaHBTWVRadTBieXJ3SitzSWxoS3d6SGRPRkE2ejQwVjlmYjBDZFg4bmdXRDluVytSbm1WV0xJSVZxYVdjekRoQXNNaUJGUWRXVjFmbCt2WHJvYmxmdkhnaHRiVzFWdXJGTVNrL0N1TncyY01hQk12RDBPTm9tV0RGNGJLSE5RaVdoNkhIMGJMellKbmQ0dWZtNWtKZVhydDJUZHJiMitQd1Y1NDlleWF2WDc4TzFUSWJsQjgvZmp5Vytra1Y4UUtzcnE2dWtML3YzcjJUcHFhbVdEdzNZQjE4N0hsM2QxY09IejRjUy8ya2loQXN5ODRUTE1zR0p6VzkrU2praWhXLysxeXhMSHZPRmN1eXdaemVMd2VjWDdIOGlsTlB0d1JMVHhaT0tTRllUc1dwcHhtQ3BTY0xwNVFRTEtmaTFOTU13ZEtUaFZOS0NKWlRjZXBwaG1EcHljSXBKV3JBT3ZnMVFwT1Rrekk0T09pVTJUNDFvd2FzZERvdCtYdys4UDd4NDhjRUM1aEVnZ1Vjbm1icEJFdHpPc0RhMUlEMTVNa1QrZkxsUzJEbCtmUG5wYTJ0RGRqYTBxU2JweUlLaDNrVkxKUEpsRFpwakdlckFTdkduaUZLOWZUMHlQTHljcURWN001bE5sTkNHUVJMYVZJRVMya3c2TElJRm5xQ1N2VVRMS1hCb01zeWIvS1VsWlVGYlpTWGwwc3FsWUpwaTlkWU1GRmhDU1ZZV0huQnFDVllNRkZoQ1NWWUlIbGxzOW45emFRS1IxMWRuWnc1YzBabEJ3UkxaU3ovRldYQTZ1enNEUDNpN2R1MzB0cmFxcklEZ3FVeUZvSUZFZ3UrVEs1WStCbXE3SUJncVl3Rlg1UzVZV3ArQ2tkbFphVlVWVldwYkk3WFdDcGp3UmRGc1BBelZOa0J3VklaQzc0b2d2Vmo2OTdDRnpsTXJPYjZSZXM5SWdUc0NCWjNzYmZDS2NFaVdBVExpZ01FeTRxdFhMRUlGc0d5NG9ESS9tdG51Vnd1TkwxNU03dW1wc1pXeWYrZDEyeHlVRGdhR3h2RmZPMEF5dUNLcFRRcFB2T3VOQmgwV1FRTFBVR2wrZ21XMG1EUVpRME5EY25MbHkrRE5zeWUwWThlUFlKcGk5ZFlNRkZoQ1NWWVdIbkJxQ1ZZTUZGaENTVllXSG5CcUNWWU1GRmhDU1ZZV0huQnFDVllNRkZoQ1NWWVdIbkJxQ1ZZTUZGaENTVllXSG5CcUNWWU1GRmhDU1ZZV0huQnFDVllNRkZoQ1NWWVdIbkJxQ1ZZTUZGaENTVllXSG5CcUNWWU1GRmhDU1ZZV0huQnFDVllNRkZoQ1NWWVdIbkJxQ1ZZTUZGaENTVllXSG5CcUNWWU1GRmhDU1ZZV0huQnFDVllNRkZoQ1NWWVdIbkJxQ1ZZTUZGaENTVllXSG5CcUNWWU1GRmhDU1ZZV0huQnFDVllNRkZoQ1NWWVdIbkJxQ1ZZTUZGaENTVllXSG5CcVAwSHU4SjRleml2N0JZQUFBQUFTVVZPUks1Q1lJST0iLCJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJTcGVlZCIsICJ2YWx1ZSI6IDF9LHsidHJhaXRfdHlwZSI6ICJBdHRhY2siLCAidmFsdWUiOiAyfSx7InRyYWl0X3R5cGUiOiAiRGVmZW5jZSIsICJ2YWx1ZSI6IDN9LHsidHJhaXRfdHlwZSI6ICJNYXRlcmlhbCIsICJ2YWx1ZSI6ICI0In1dfQ==','base64').toString('ascii');

     //let b=  decodeBase64(substringRes);

     let c = Base64decoder(substringRes)
      console.log(c)
    let jsonObj =   JSON.parse(c);
     console.log(jsonObj.image_data)
    //  console.log(b);
    }).catch((err) => {
      console.log(err);
    });




    // 1. json to string
    // 2. img data from json



    //https://stackoverflow.com/questions/55028583/how-do-i-call-setstate-from-another-component-in-reactjs
    //zusätzlich state connectwallet
    //  this.setState({connectWallet:<ConnectWalletModal></ConnectWalletModal>})




  }


  getInput  = async () =>{
    let input = await document.getElementById("input").value
    this.setState({name:input});
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
        let input = document.getElementById("input").value

        this.setState({ image: canvas.toDataURL(), name:input }, () => {
          let picString = this.state.image
          //console.log(picString)






          try{
            const input = document.querySelector('input');
            const log = document.getElementById('values');

            input.addEventListener('input', updateValue);

            function updateValue(e) {
              log.textContent = e.target.value;
            }
            let name = this.state.name
            let description = ""



            //console.log(contract.methods.formatTokenURIforOpenSea(name, description, picString).call());



            // true --> png für rarible // false -> svg für openseaa
            const x = true;
            contract.methods.mint(x, name, description, picString).send({ from: accounts[0], value: 1000000000000000, picString }) // value in wei
                .then(function (receipt) {
                  // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                  alert("picture minted!")
                  //safe pic to api
                  console.log(receipt)



                })
                .then(createNFTData(picString))

            ;}catch(error){
            alert("minting failed")
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
    /*     const log = document.getElementById('values');
        let log2 = document.querySelector("#nameInput");
        console.log(log2) */


    let name = this.state.name

    return <div className="Appi">

      <div className="navbar" style={{ backgroundColor: "#101522" }}>
        <button id="btn" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded"><p style={{ fontWeight: 'bold', fontSize: '200%' }}>Reset</p></button>
        <div style={{ width: '30px' }}></div>
        <button id="eraserBtn" class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-4 px-10 border border-blue-500 hover:border-transparent rounded"><p style={{ fontWeight: 'bold', fontSize: '200%' }}>Eraser</p></button>
        <input type="color" valueDefault="#00eeff" id="color" class="color"></input>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.connect}>Connect another Wallet</button>
        {this.state.connectWallet}
        {/* {account != null ? <h1>Connected to Wallet: {account}</h1>: <h1>Wallet not connected</h1>} */}
      </div>


      <p>{this.state.width < 800 ? (
          <div style={{ height: myWidth, width: myWidth }} className="container" id="container"></div>
      ) : <div style={{ height: "800px", width: "800px" }} className="container" id="container"></div>}
      </p>

      <div style={{ height: "100px" }}></div>

      <input style={{width:"30%"}}id="input" value={name} type="text" onChange={this.getInput}  placeholder="Name your NFT"/>
      {/*       <Input id="nameInput" type="text" onChange={this.getInput} value={name} placeholder="Name your NFT" />
 */}

      {/* <Input type="text" placeholder="Give your NFT a description" /> */}
      <Button2 onClick={this.mintPicture}>Mint your artwork</Button2>

    </div>;

  }
}

export default Pixelart;