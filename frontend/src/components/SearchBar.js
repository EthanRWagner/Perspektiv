import React, {useState} from "react";
import axios from 'axios'; 
import "../css/SearchBar.css"
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";

// database port
const port = 8675;

const SearchBar = () => {

    // text state for search bar
    const [searchInput, setSearchInput] = useState("");
    // state for preview for users
    const [resultList, setResults] = useState([]);
    // web navigation method saved to a constant variable for easier use 
    const navigate = useNavigate();

    // post call to get users for the search preview/drop down
    async function getResultList(val){
        try{
            const users = await axios.get(`http://localhost:${port}/search`, { params: { username : val } });
            await setResults(users.data.user_list);
        }
        catch(er){
            console.log(er); 
        }
    }

    // updates the state based on user typing in search bar
    const handleChange = async (e) => {
        e.preventDefault();
        let val = e.target.value;
        await setSearchInput(val);
        if(val != '') {
          await getResultList(val)
        }
    };

    // function to get hodgepodge and user search data and passes it into the state of the search window
    // to pass the information to search page
    async function handleSearch(e){
        e.preventDefault();
        const users = await axios.get(`http://localhost:${port}/search`, { params: { username : searchInput } });
        await axios.get(`http://localhost:${port}/search`, { params: { hp : searchInput } }).then(response => {
            navigate("../search", { state: { hp_list: response.data.hp_list, user_list: users.data.user_list, search_input: searchInput } });
            window.location.reload(false);
        });
    }

    // function to clear input for X button next to search bar
    const clearInput = () => {
        setResults([]);
        setSearchInput("");
    };

    // search reactive to preview users
    if (searchInput.length > 0) {
        resultList.filter((resultList) => {
            return resultList.username.match(searchInput);
        });
    }

    // need to clean up design for search bar
    return (
      <div className="search">
        <form className="search-bar" onSubmit={handleSearch}>
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
        </form>
        
      </div>
    );
}

export default SearchBar;
