import { createContext, useState } from "react";

const stateContext = createContext({});

export const ContactProvider = ({ children }) => {
    const [contactData, setContactData] = useState([{}]);
    const [allContacts, setAllContacts] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <stateContext.Provider value={{
            contactData,
            setContactData,
            allContacts,
            setAllContacts,
            name,
            setName,
            email,
            setEmail,
            phone,
            setPhone
        }}>
            {children}
        </stateContext.Provider>
    )
}

export default stateContext;