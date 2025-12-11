import React, { createContext, useContext, useState, useEffect } from 'react';

const PermissionContext = createContext();

export const usePermissions = () => {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionProvider');
    }
    return context;
};

export const PermissionProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/admins/permissions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setPermissions(data.permissions || []);
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const hasPermission = (permission) => {
        return permissions.includes(permission) || permissions.includes('all');
    };

    const isSuperAdmin = () => {
        return permissions.includes('all');
    };

    const value = {
        permissions,
        hasPermission,
        isSuperAdmin,
        loading,
        refreshPermissions: fetchPermissions
    };

    return (
        <PermissionContext.Provider value={value}>
            {children}
        </PermissionContext.Provider>
    );
};
