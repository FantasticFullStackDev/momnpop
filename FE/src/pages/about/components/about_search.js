import React from "react";
import Autocomplete from 'react-autocomplete';

import "./about_search.css";

class AboutSearch extends React.Component {
    state= { value: ''};

    getBusiness = () => {
        return [{name: "Joe's Furniture Store", logo: 'logo-1.png'}, {name: 'Mon and Pop', logo: 'logo-2.png'}, {name: 'React Dev Team', logo: 'logo-3.png'}];
    }
    
    matchBusiness = (state, value) => {
        console.log(state);
        console.log(value);
     //   if( state.name && state.logo)
            return (
                state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                state.logo.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
    }

    searchBusiness = () => {
        if(this.state.value != '')
            alert('You are looking for the business named "' + this.state.value + '"');
    }

    render(){
        return (
            <>
                <div className="part_block">
                    <div className="row custom_container">
                        <div className='about_search_title'>
                        Search for a small business around you
                        </div>
                        <div className='about_search_form'>
                            <div className='searchIconBox'>
                                <div class='searchIcon'>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.7796 16.7216L13.4522 12.3943C14.5249 11.0865 15.1714 9.41143 15.1714 
                                        7.58571C15.1714 3.39796 11.7735 0 7.58571 0C3.39429 0 0 3.39796 0 7.58571C0 11.7735 
                                        3.39429 15.1714 7.58571 15.1714C9.41143 15.1714 11.0829 14.5286 12.3906 13.4559L16.718 
                                        17.7796C17.0118 18.0735 17.4857 18.0735 17.7796 17.7796C18.0735 17.4894 18.0735 17.0118 
                                        17.7796 16.7216ZM7.58571 13.6616C4.23184 13.6616 1.50612 10.9359 1.50612 7.58571C1.50612 
                                        4.23551 4.23184 1.50612 7.58571 1.50612C10.9359 1.50612 13.6653 4.23551 13.6653 7.58571C13.6653 
                                        10.9359 10.9359 13.6616 7.58571 13.6616Z" fill="#787878"/>
                                    </svg> 
                                </div>
                            </div>
                            <div className='searchInput'>
                            <Autocomplete
                                value={ this.state.value }
                                inputProps={{ id: 'states-autocomplete' }}
                                wrapperStyle={{ 'width': '100%',
                                                'height':  '100%',
                                                'top': '0px',
                                                'left': '0px'
                                            }}
                                inputProps={{ className: 'searchInputContent' }}
                                items={ this.getBusiness() }
                                getItemValue={ item => item.name }
                                shouldItemRender={ this.matchBusiness }
                                onChange={(event, value) => this.setState({ value }) }
                                onSelect={ value => this.setState({ value }) }
                                renderMenu={ children => (
                                    <div className = "autocomplete-menu">
                                    { children }
                                    </div>
                                )}
                                renderItem={ (item, isHighlighted) => (
                                    <div
                                    className={`item ${isHighlighted ? 'item-highlighted' : 'item-normal'}`}
                                    key={ item.abbr } >
                                     <div className='businessLogo'>
                                         <img src={'./' + item.logo} width="24px" height="24px"/>
                                     </div>
                                        {item.name}
                                    </div>
                                )}
                            />
                            </div>
                            <div className="searchBtn" onClick={this.searchBusiness}>Search</div>                                   
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default AboutSearch;
