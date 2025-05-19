// src/Components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('user'); // Check user login
    return isAuthenticated ? children : <Navigate to="/Login" replace />;
};

export default PrivateRoute;


// const PrivateRoute = ({ children, allowedRoles, redirectPath = "/login" }) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//         return <Navigate to={redirectPath} replace />;
//     }

//     if (!user.roles || !user.roles.some(role => allowedRoles.includes(role))) {
//         return <Navigate to="/unauthorized" replace />;
//     }

//     return children;
// };

// export default PrivateRoute;