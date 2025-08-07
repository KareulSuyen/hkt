import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <div>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/help'>Help</NavLink>
            </div>
        </>
    );
};


export default Navbar;