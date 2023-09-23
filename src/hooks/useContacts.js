import { useContext } from "react";
import ContactProvider from "../context/ContactProvider";

const useContact = () => {
    return useContext(ContactProvider);
}

export default useContact;