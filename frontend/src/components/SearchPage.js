import React from 'react';
import { useLocation } from 'react-router-dom';
import "../css/SearchPage.css";
import MyGallery from './MyGallery';

function SearchPage (){

    const location = useLocation();

    console.log(location.state)

    // const [search, setSearch] = useState({featured_HP: [],
    //                                       featured_User: [],
    //                                       featured_Tag: [],
    //                                       search_HP: [],
    //                                       search_User: [],
    //                                       search_Tag: []});

    // const HP_Search = () => {
      
    //     const hps = [];

    //     for (let i = 0; i < userFeed[index].hpList.length; i++) {
    //         if (i === userFeed[index].hpList.length-1){
    //             hodges.push(
    //                 <small key={userFeed[index].hpList[i]}
    //                        className="descr">
    //                         {userFeed[index].hpList[i]}
    //                 </small>);
    //         }
    //         else {
    //             hodges.push(<small key={userFeed[index].hpList[i]} 
    //                                className="descr">
    //                                 {userFeed[index].hpList[i]}
    //                         </small>);
    //             hodges.push(<small key={i} 
    //                                className="descr">
    //                                 ,&nbsp;
    //                         </small>);
    //         }
    //     }

    //     return hodges;
    //   };

    return (
        <div>
            <div className='search-content'>
                <div className='featured-frame'>
                    <div  className='featured-box'>
                        <t className='box-headings'>Featured HodgePodges</t>
                        <MyGallery />
                    </div>

                    <div className='featured-box'>
                        <t className='box-headings'>Featured People</t>
                        <MyGallery />
                    </div>

                    <div className='featured-box'>
                        <t className='box-headings'>Featured Posts</t>
                        <MyGallery />
                    </div>
                </div>

                <div className='line-break'></div>

                <div className='results-frame'>
                    <div  className='results-box'>
                        <t className='box-headings'>Results In HodgePodges</t>
                        <div className='sample-result'></div>
                    </div>

                    <div className='results-box'>
                        <t className='box-headings'>Results In People</t>
                        <div className='sample-result'></div>
                    </div>

                    <div className='results-box'>
                        <t className='box-headings'>Results In Tags</t>
                        <div className='sample-result'></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SearchPage;