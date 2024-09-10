import Sidebar from "./sideBar";
import "./../styles/navBar.css"
import { useState } from "react";

export const Navbar = () => {
    const [search, setSearch] = useState("");

    return (
            <nav className="navbar">
                <span>
                    <Sidebar/>
                </span>
                <span>
                    <input type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search} />
                </span>
            </nav> 
    );
}