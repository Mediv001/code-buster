import "./search.css"
import searchLogo from '../../assets/busqueda.svg';

export const Search = ({ handleSearch, placeholder }) => {
    return (
        <div className='search min-width-at-icon-size'>
            <div className="search_wrapper">
                <input className='search_input'
                    type="search"
                    onChange={handleSearch}
                    placeholder={placeholder}
                    autoFocus
                />
                <img className='search_icon' src={searchLogo} alt="" />
            </div>
        </div>)
}