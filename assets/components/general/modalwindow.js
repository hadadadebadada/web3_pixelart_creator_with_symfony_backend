import React, { useState } from "react";
//import "../../../css/tailwind.css";
import "../../tailwind.css"
// eslint-disable-next-line react/prop-types
const Modal = ({msg}) => {
    const [showModal, setShowModal] = useState(true);
    return (
        <>

            {showModal ? (
                <>
                    <div id="successModal" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font=semibold">{msg}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <p   className="text-sm">Diese finden den Eintrag nun unter: <a style={{textDecorationLine: "underline"}} href="/benutzergruppe/konfigurieren#nav-service">eigene Verwaltung</a>.</p>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                    <button
                                        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                                        type="button"
                                        onClick={() => setShowModal(false)}>
                                        OK
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Modal;