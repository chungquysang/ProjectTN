import { logout } from '../services/API/authservices'; // đường dẫn tùy vào nơi bạn export API
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const doLogout = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                if (token) {
                    await logout(token);
                }
                localStorage.removeItem('user');
                navigate('/Login');
            } catch (err) {
                console.error('Logout failed:', err);
                localStorage.removeItem('user');
                navigate('/Login');
            }
        };

        doLogout();
    }, [navigate]);

    return null; // không render gì cả
};

export default Logout;
