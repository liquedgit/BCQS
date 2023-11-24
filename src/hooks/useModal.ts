import { useState } from "react";


export function useModal(){
    const [showModal, setShowModal] = useState(false)

    const toogleShowModal = ()=>{
        setShowModal(!showModal);
    }

    return {showModal, toogleShowModal}
}