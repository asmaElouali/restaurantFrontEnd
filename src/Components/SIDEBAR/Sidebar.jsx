import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const menuItems = [
        {
            path: '/',
            name: 'Ville',
            icon: <FaTh />,
        },
        {
            path: '/zone',
            name: 'Zone',
            icon: <FaUserAlt />,
        },
        {
            path: '/serie',
            name: 'Serie',
            icon: <FaUserAlt />,
        },
        {
            path: '/specialite',
            name: 'Specialite',
            icon: <FaUserAlt />,
        },
        {
            path: '/restaurant',
            name: 'Restaurant',
            icon: <FaUserAlt />,
        }
    ];

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: isOpen ? '200px' : '50px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    transition: 'width 0.2s ease-out',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '60px',
                        justifyContent: isOpen ? 'space-between' : 'center',
                        borderBottom: isOpen ? '1px solid #eee' : 'none',
                    }}
                >
                    <h1
                        style={{
                            display: isOpen ? 'block' : 'none',
                            margin: '0 20px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Logo
                    </h1>
                    <div style={{ margin: '0 10px' }}>
                        <FaBars onClick={toggle} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '50px',
                            padding: '0 20px',
                            color: '#333',
                            textDecoration: 'none',
                        }}
                        activeclassname="active" // Updated prop name
                    >
                        <div style={{ marginRight: '10px' }}>{item.icon}</div>
                        <div style={{ display: isOpen ? 'block' : 'none' }}>
                            {item.name}
                        </div>
                    </NavLink>
                ))}
            </div>
            <div
                style={{
                    marginLeft: isOpen ? '200px' : '50px',
                    transition: 'margin-left 0.2s ease-out',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    padding: '20px',
                }}
            >
                {children}
            </div>
        </>
    );
};

export default Sidebar;