import React, { Component } from 'react';
import "../../tailwind.css"
import AOS from 'aos';
import "aos/dist/aos.css"



class TestTailwind extends Component {


    componentDidMount() {
        AOS.init({
            duration: 2500,
        })
    }

    render() {

        return (
            <div
                style={{
                    backgroundColor: "#101522"
                }}
            >




                <h1 style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center"
                }}

                    class="font-medium leading-tight text-4xl mt-0 mb-2 text-white" id="roadmap">Our Roadmap</h1>

<div class="md:container md:mx-auto bg-[#101529] rounded shadow border p-8 m-10 hover:bg-blue-900 ..."
                    data-aos="flip-right"
                    style={{
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "150%"
                    }}>


                    The main functionality is developed and in production. You can mint your first NFT's on the rinkeby testnet.
                        </p>
                </div>
                <div className="roadmap" class="md:container md:mx-auto bg-[#101529] rounded shadow border p-8 m-10 hover:bg-blue-400 ..."
                    data-aos="flip-left"
                    style={{
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "150%"
                    }}>

                        Beginn your web3 pixelgrid journey with minting on-chain NFT's with just one click. The NFT will be generated with metadata you provide.
                        The on-chain NFT is compatible with the opeansea metadata standard. After you minted your NFT it will be displayed on Opensea.
                    </p>
                </div>
                <div class="md:container md:mx-auto bg-[#101529] rounded shadow border p-8 m-10 hover:bg-blue-900 ..."
                    data-aos="flip-right"
                    style={{
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "150%"
                    }}>
                        
                        
                        It's not just a NFT you completely  own all rights and the picture itself. The last minted NFT will be displayed on our 3d earth with the last 8 pixelart works orbiting it. 
                        </p>
                </div>
                <div class="md:container md:mx-auto bg-[#101529] rounded shadow border p-8 m-10 hover:bg-blue-400 ..."
                    data-aos="flip-left"
                    style={{
                        borderRadius: '5px'
                        ,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "150%"
                    }}>
                        
                    Since all NFT's are converted to 3d objects. We will introduce you to a 3d online art gallary which will be accessible through your browser or in VR.                         
                        </p>
                </div>

                <div class="md:container md:mx-auto bg-[#101529] rounded shadow border p-8 m-10 hover:bg-blue-400 ..."
                    data-aos="flip-right"
                    style={{
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "150%"
                    }}>
                        Buy your own ground on a massive grid. This will be our next project. Like reddit's r/place you will be able to mint pixels on a massive grid and only the owner of the pixel can change it's color.
                        
                        </p>
                </div>
{/*                 <div className="testy" class="md:container md:mx-auto bg-[#101529] rounded shadow border p-8 m-10 hover:bg-blue-900 ..."
                    data-aos="flip-right"
                    style={{
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "150%"
                    }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare arcu non hendrerit pulvinar. Fusce tincidunt diam sed est pulvinar suscipit. Aliquam nulla odio, maximus a tempor eget, dapibus cursus tellus. Donec dignissim dolor varius hendrerit tempor. Ut orci leo, sagittis vitae aliquet at, sodales eget orci. Nulla venenatis vulputate dolor quis sodales. Maecenas ultrices ipsum et nulla tempor, ac malesuada nunc feugiat.</p>
                </div> */}
            </div>
        );
    }
}

export default TestTailwind;