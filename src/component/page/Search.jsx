import { useLocation } from "react-router-dom";
import TableData from "../Table";

function Search(){
    const location = useLocation();
    const { results } = location.state;
    return(
        <div>
            {results && results.length > 0 ? (
                <TableData getKonten={results}/>
            ):(
            <div>
                <h1 className="text-3xl font-semibold">Surat tidak ditemukan</h1>
            </div>)}
        </div>
    )
}

export default Search;