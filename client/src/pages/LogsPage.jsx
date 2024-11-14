import React from "react";
import Nav from "../components/Navbar";
import Logs from "../components/Logs";
import Pagination from "../components/Pagination";

const LogsPage = () => {
    return (
        <div>
            <Nav />
            <ol className="relative m-2">
                <Logs type="all" />
            </ol>
            <Pagination />
        </div>
    );
};

export default LogsPage;
