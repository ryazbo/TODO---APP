import { ReactNode, useEffect, useRef, useState } from "react";
import "./../styles/sideBarStyle.css"
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { storage } from "../data/storage/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSideBar } from "../Context/SideBarContext";
import { SideBarTypes } from "../data/dataRender/SideBarTypes";

interface ItemProps {
    title: string;
    navigate: string;
    icon: ReactNode;
    isActive?: boolean
}

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const sideBarRef = useRef<HTMLDivElement>(null);
    const {state} = useSideBar();
    const {RecopileData} = SideBarTypes();

    const handleSideBarMenu = () => {
        setOpen(!open);
    };
    const handleLogOut = () => {
        storage.removeItem('usr_data_usrName');
        storage.removeItem('usr_data_usrEmail');
        storage.removeItem('usr_data_usrTelefono');
        setIsAuthenticated(false);
        navigate('/login');
    };
    useEffect(()=>{
        RecopileData();
    },[])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node) && open) {
                handleSideBarMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    const userName = storage.getItem('usr_data_usrName', '') || 'Nombre Usuario';

    return (
        <>
            <div className="sidebar-button" onClick={handleSideBarMenu}>
                <MenuIcon sx={{fontSize: 'auto', cursor:'pointer' }} className="menu-icon"/>
            </div>
            <aside className={`sidebar-box ${open ? "open" : "close"}`} ref={sideBarRef}>
                <section className="brandside">
                    <div className="closesidebar" onClick={handleSideBarMenu}>
                        <MenuIcon sx={{fontSize: 'auto', cursor:'pointer' }} className="menu-icon"/>
                    </div>
                    <div className="brandName">
                        <label>taskmanager</label>
                    </div>
                </section>
                <section className="middle-content">
                {state.item ? (
                    <>
                        {state.item.map((e: ItemProps, index: number) => (
                            <div className="itemlist" key={index} onClick={()=>{
                                navigate(e.navigate);
                            }}>
                                <div className="icon">
                                    {e.icon}
                                </div>
                                <label>{e.title}</label>
                            </div>
                        ))}
                    </>
                ) : null}
                </section>
                <section className="bottom-content">
                    <div className="linkGroup">
                        <LogoutIcon onClick={handleLogOut} className="logout-button" sx={{ cursor: 'pointer' }}/>
                        <label onClick={handleLogOut} className="links-bottom">log-out</label>
                    </div>
                    <section className="usr-info">
                        <span className="usr-icon">
                            <PersonIcon />
                        </span>
                        <label className="usr-name">{userName}</label>
                    </section>
                </section>
            </aside>
            <section className={`cape ${open ? "open" : "close"}`} onClick={()=>{
                setOpen(false)
            }}>
            </section>
        </>
    );
};

export default Sidebar;


