import axios from 'axios'; 
import React, {useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import "../css/SearchPage.css";
//import MyGallery from './MyGallery';

const port = 8675;

function SearchPage (){
    //variable to get user
    const initializedRef = useRef(false);

    //variable to pass the search items from the search bar to page
    const location = useLocation();

    // state for search results
    const [search, setSearch] = useState({search_HP: [],
                                          search_User: []});
    
    // captures the user looking at the search page                                     
    const [user, setUser] = useState({});
    
    //kind of a fix to load the search results when page loads
    // have to refresh when page loads, look for solution
    window.addEventListener('load', () => {
        setSearch({search_HP: location.state.hp_list, search_User: location.state.user_list});
    });

    // gets the user to obtain user data
    const getUser =  async () => {
        var id = window.sessionStorage.getItem("id");
        try {
            var response = await axios.get(`http://localhost:${port}/users/${id}`)
            setUser(response.data.user);
        }
        catch(er) {
            console.log(er);
        }
    }

    //ask nate what this does
    if (!initializedRef.current) {
        initializedRef.current = true;
        getUser();
      }

    // posts to db that user joined db from search results
    async function joinHPSearch (hp_name) {
        try {
            await axios.post(`http://localhost:${port}/joinHP`, {username: user.username, hp: hp_name});
        }
        catch (error) {
            console.log(error);
        }
    }

    // if user clicks on a user search result navigates to their profile page
    const navigateToUserPage = (userName) => {
        var url = "";
        if (userName === user.username)
            url = "http://localhost:3000/profile";
        else
            url = "http://localhost:3000/profile?username=" + userName;
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    // function caller to go to user profile page
    const onClickUser = (userName) => {
        return () => navigateToUserPage(userName)
    }

    // creates HTML elements from HP search results
    const HP_enum = () =>{
        const hodges = [];
        const hp_results = search.search_HP;
        const user_hps = user.hpList;
        for (let i = 0; i < hp_results.length; i++) {
            if(user_hps.includes(hp_results[i].name)){
                hodges.push(
                    <div className='search-item'>
                        <small key={hp_results[i].name}
                               className="descr">
                               JOINED &#10003;&emsp;{hp_results[i].name}
                        </small>
                    </div>
                );
            }
            else{
                hodges.push(
                    <div className='search-item' onClick={() => joinHPSearch(hp_results[i].name)}>
                        <small key={hp_results[i].name}
                               className="descr">
                               ADD &emsp;{hp_results[i].name}
                        </small>
                    </div>
                );
            }
        }
        return hodges;
    }

    // creates HTML elements from user search results
    const people_enum = () =>{
        const people = [];
        const people_results = search.search_User;
        for (let i = 0; i < people_results.length; i++) {
            if(user.username === people_results[i].username){
                people.push(
                    <div className='search-item' onClick={onClickUser(people_results[i].username)}>
                        <small key={people_results[i].username}
                               className="descr">
                               [YOU]&emsp;{people_results[i].username}
                        </small>
                    </div>);
            }
            else{
                people.push(
                    <div className='search-item' onClick={onClickUser(people_results[i].username)}>
                        <small key={people_results[i].username}
                               className="descr">
                               {people_results[i].username}
                        </small>
                    </div>);
            }
        }
        return people;
    }

    // IF WE WANT TO ADD FEATURED HPS, USERS, AND POSTS
    // <div className='featured-frame'>
    //     <div  className='featured-box'>
    //         <t className='box-headings'>Featured HodgePodges</t>
    //         <MyGallery />
    //     </div>

    //     <div className='featured-box'>
    //         <t className='box-headings'>Featured People</t>
    //         <MyGallery />
    //     </div>

    //     <div className='featured-box'>
    //         <t className='box-headings'>Featured Posts</t>
    //         <MyGallery />
    //     </div>
    // </div>

    return (
        <div>
            <div className='search-content'>
                <div className='line-break'></div>
                <b className='box-headings'>Search Results for: </b> <small>&quot;{location.state.search_input}&quot;</small>
                <div className='line-break'></div>

                <div className='results-frame'>
                    <div  className='results-box'>
                        <small className='box-headings'>Results In HodgePodges</small>
                        <div className='sample-result'>
                            {HP_enum()}
                        </div>
                    </div>

                    <div className='results-box'>
                        <small className='box-headings'>Results In People</small>
                        <div className='sample-result'>
                            {people_enum()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SearchPage;