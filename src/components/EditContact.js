import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import '../css/createcontact.css'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useContact from "../hooks/useContacts";

const EditContact = ({ id }) => {

    const [isOpen, setIsOpen] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const { name, email, phone, setName, setEmail, setPhone, contactData, setContactData } = useContact();

    const handleButtonClick = () => {
        console.log(contactData);
        const contact = contactData.find(contact => contact._id === id);
        console.log(contact);

        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setIsOpen(!isOpen);
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
            const response = await axiosPrivate.put(`/contacts/${id}`,
                JSON.stringify(newContact),
            )
            setContactData(contactData.map(prevContact => {
                return prevContact._id === id ?
                    {
                        ...prevContact,
                        name: newContact.name,
                        email: newContact.email,
                        phone: newContact.phone
                    } : prevContact
            }));
        } catch (error) {
            console.log(error?.response);
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {!isOpen ?
                <FontAwesomeIcon
                    icon={faEdit}
                    className='contact-icon'
                    onClick={handleButtonClick}
                />
                :
                <div className="glassmorphic-container">
                    <div className="form-overlay">
                        <div className="form-container">
                            <h2>Edit Contact</h2>
                            <form onSubmit={handleSubmitButton}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <input
                                    type="tel"
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
                </div>
            }
        </>
    );
};

export default EditContact;
