import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import '../css/createcontact.css'
import useContact from "../hooks/useContacts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreateContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { name, email, phone, setName, setEmail, setPhone } = useContact();
    const axiosPrivate = useAxiosPrivate();
    const { contactData, setContactData } = useContact();


    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        setName("");
        setEmail("");
        setPhone("");
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmitButton = async (event) => {
        event.preventDefault();
        const newContact = { name, email, phone };
        try {
            const response = await axiosPrivate.post('/contacts/',
                JSON.stringify(newContact),
            )
            setContactData([...contactData, newContact]);
        } catch (error) {
            console.log(error?.response);
        }
        setIsOpen(!isOpen);
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <div className="glassmorphic-container">
            {!isOpen && (
                <button className="toggle-button" onClick={handleButtonClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            )}
            {isOpen && (
                <div className="form-overlay">
                    <div className="form-container">
                        <h2>Add Contact</h2>
                        <form onSubmit={handleSubmitButton}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                            <button type="submit" className="submit-button">
                                submit
                            </button>
                        </form>
                        <button className="close-button" onClick={handleButtonClick}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateContact;
