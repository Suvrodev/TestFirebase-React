import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <h1>This is Main</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;