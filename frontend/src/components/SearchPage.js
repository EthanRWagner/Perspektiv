import React from 'react';
import "../css/SearchPage.css";
import "../components/SearchBar";
import MyGallery from './MyGallery';
import SearchBar from '../components/SearchBar';

function SearchPage (){

    return (
        <div>
            <br/>
            <SearchBar/>
            <br/>
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