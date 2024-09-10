import { ReactNode } from "react"
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useLocation } from "react-router-dom";
import { useSideBar } from "../../Context/SideBarContext";

interface ItemProps {
    title: string;
    navigate: string;
    icon: ReactNode;
    isActive?: boolean
}

export const SideBarTypes = () => {
    const location = useLocation();
    const {dispatch} = useSideBar();

    const RecopileData = () => {
        const recopile : ItemProps[] = [{
            title: 'home', icon: <HomeIcon />, navigate: '/', isActive: location.pathname === '/' ? true : false
        }, {
            title: 'task', icon: <AssignmentIcon/>, navigate: '/task', isActive: location.pathname === '/task' ? true : false
        }]
        console.log(recopile[0].title)
        dispatch({ payload: recopile, type: "SET_SIDE_BAR_ITEMS" })
    }
    return {RecopileData}
}