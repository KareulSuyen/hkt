import { Navlink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div>
                <Navlink to='/'>Home</Navlink>
                <Navlink to='/help'>Help</Navlink> 
            </div>
        </>
    );
}

export default Navbar;