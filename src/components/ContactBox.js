import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditContact from './EditContact';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useContact from '../hooks/useContacts';

const ContactBox = ({ id, name, phone }) => {

    const axiosPrivate = useAxiosPrivate();

    const { contactData, setContactData } = useContact();

    const handleDeleteClick = async () => {
        try {
            const response = await axiosPrivate.delete(`/contacts/${id}`)
            console.log(JSON.stringify(response.data));
            const newContacts = contactData.filter(contact => contact._id !== id && contact);
            setContactData(newContacts);
            console.log(contactData);
            console.log(newContacts);
        } catch (error) {
            console.log(error?.response);
        }
    };

    return (
        <div className='contact-container'>
            <div className='contact-box'>
                <div>
                    <div className='contact-name'>
                        <span>{name}</span>
                    </div>
                    <div className='contact-phone'>
                        <span>{phone}</span>
                    </div>
                </div>
                <div className='contact-icons'>
                    <EditContact key={id} id={id} />
                    <FontAwesomeIcon
                        icon={faTrash}
                        className='contact-icon'
                        onClick={handleDeleteClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactBox;
