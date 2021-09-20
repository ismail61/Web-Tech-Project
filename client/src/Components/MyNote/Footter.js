import React from 'react';
import { FaCopyright } from 'react-icons/fa';
const Footter = () => {
    return (
        <div>
            <div className="text-white fixed-bottom bg-dark p-2">
                <div className="text-center">
                    <span className="p-0"><FaCopyright /> </span>
                    {new Date().getFullYear()} Copyright | My Note
                </div>
            </div>
        </div>
    );
};

export default Footter;