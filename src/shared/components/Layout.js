import React, { useEffect, useState } from "react";

import MainNavigation from "./Navigation/MainNavigation";
import JsonData from '../../data/data.json';
import Footer from './Footer';

const Layout = (props) => {
    const [kkData, setKKData] = useState({});
    useEffect(() => {
        setKKData(JsonData)
    }, []);
    return (
        <div>
            <MainNavigation />
            <main>
                {props.children}
            </main>
            <Footer data={kkData.Social} />
        </div>
    )
}

export default Layout;