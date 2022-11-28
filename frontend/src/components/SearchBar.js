import React, {useState} from "react";
import axios from 'axios'; 
import "../css/SearchBar.css"
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const port = 8675;

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [resultList, setResults] = useState([]);

    async function getResultList(val){
      try{
        const users = await axios.get(`http://localhost:${port}/search`, { params: { username : val } });
        await setResults(users.data.user_list);
    }
    catch(er){
        console.log(er); 
    }
    }

  const handleChange = async (e) => {
    e.preventDefault();
    let val = e.target.value;
    await setSearchInput(val);
    await getResultList(val)
  };

  const clearInput = () => {
    setResults([]);
    setSearchInput("");
  };
  
  if (searchInput.length > 0) {
      resultList.filter((resultList) => {
      return resultList.username.match(searchInput);
  });
}

  return (
    <div className="search">
      <div className="search-bar">
        <input
            type="text"
            name="searchbar"
            placeholder="Search here..."
            onChange={handleChange}
            value={searchInput}/>
        <div className="searchIcon">
          {searchInput.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        {searchInput != '' && <div className="dataResult">
          {resultList.slice(0, 15).map((value) => {
            return (
              <a key={value._id} className="dataItem" href={"/profile?username=" + value.username} target="_self">
                <p>{value.username} </p>
              </a>
            );
          })}
        </div>}
      </div>
      
    </div>
  );
}

export default SearchBar;
