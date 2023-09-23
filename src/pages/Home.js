import '../css/contact.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContactBox from '../components/ContactBox';
import CreateContact from '../components/CreateContact';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useContact from '../hooks/useContacts';

export default function Home() {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { contactData, setContactData, allContacts, setAllContacts } = useContact();



    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getContacts = async () => {
            try {
                const response = await axiosPrivate.get('/contacts');
                isMounted && setContactData(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        }

        getContacts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    useEffect(() => {
        console.log(contactData);
        setAllContacts(contactData.map(contact => {
            return (
                <ContactBox
                    key={contact._id}
                    id={contact._id}
                    name={contact.name}
                    phone={contact.phone}
                />
            )
        }))
    }, [contactData])

    return (
        <>
            <Navbar />
            <div className='main-container'>
                {!contactData.length ?
                    <h1 className='no-contacts'>No Contacts Saved</h1> :
                    allContacts
                }
                <div>
                    <CreateContact />
                </div>
            </div>
        </>
    )
}