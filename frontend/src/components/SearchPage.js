import axios from 'axios'; 
import React, {useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import "../css/SearchPage.css";
//import MyGallery from './MyGallery';

const port = 8675;

function SearchPage (){

    const initializedRef = useRef(false);

    const location = useLocation();

    const [search, setSearch] = useState({search_HP: [],
                                          search_User: []});

    const [user, setUser] = useState({});

    window.addEventListener('load', () => {
        setSearch({search_HP: location.state.hp_list, search_User: location.state.user_list});
    });
    
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

    if (!initializedRef.current) {
        initializedRef.current = true;
        getUser();
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

    async function joinHPSearch (hp_name) {
        try {
            await axios.post(`http://localhost:${port}/joinHP`, user.username, hp_name);
        }
        catch (error) {
            console.log(error);
        }

    }

    const navigateToUserPage = (userName) => {
        var url = "";
        if (userName === user.username)
            url = "http://localhost:3000/profile";
        else
            url = "http://localhost:3000/profile?username=" + userName;
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onClickUser = (userName) => {
        return () => navigateToUserPage(userName)
    }

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
                    <div className='search-item' onClick={joinHPSearch}>
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