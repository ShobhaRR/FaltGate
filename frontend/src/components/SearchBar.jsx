function SearchBar({ value, onChange }) {

    return (

        <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={value}
            onChange={onChange}
        />

    );

}

export default SearchBar;