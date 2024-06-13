import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbars({isOpen}){
    const location = useLocation();
    return(
        <nav className="container inline-flex mx-5 justify-between">
            <Link to='/' className="w-full">
                <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faHome}/>
                <span className="mx-3 font-mono text-md text-slate-600">..{location.pathname}</span>
            </Link>
            <div className={`w-full flex ${isOpen ? 'ml-80' : 'justify-end'}`}>                
                <form className="flex items-center">
                    <i className="absolute mx-3"><FontAwesomeIcon style={{ fontSize: '1em' }} icon={faSearch}/></i>
                    <input type="search" id="default-search" className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search" required/>
                </form>
            </div>
        </nav>
    )
}
Navbars.propTypes = {
    isOpen: PropTypes.bool.isRequired
  };

export default Navbars;