import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from "axios";
import { useState } from "react";

function Navbars({isOpen}){
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/api/search/surat', {
                params: {
                    keyword: searchTerm
                }
            });
            navigate('/search', { state: { results: response.data } });
        } catch (error) {
            console.error("Error!", error);
        }
    };
    return(
        <nav className="container inline-flex mx-5 justify-between">
            <Link to='/' className="w-full">
                <FontAwesomeIcon style={{ fontSize: '1em' }} icon={faHome}/>
                <span className="mx-3 font-mono text-md text-slate-600">..{location.pathname}</span>
            </Link>
            <div className={`w-full flex ${isOpen ? 'ml-28' : 'justify-end mr-10'}`}>                
                <form className="flex items-center">
                    <i className="absolute mx-3"><FontAwesomeIcon style={{ fontSize: '1em' }} icon={faSearch}/></i>
                    <input onChange={handleInputChange} value={searchTerm} type="text" id="default-search" className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search" required/>
                    <button onClick={handleSearch}  className='px-5 py-2 button-search text-white bg-blue-700 ml-3 rounded-md'>Cari</button>
                </form>
            </div>
        </nav>
    )
}
Navbars.propTypes = {
    isOpen: PropTypes.bool.isRequired
  };

export default Navbars;