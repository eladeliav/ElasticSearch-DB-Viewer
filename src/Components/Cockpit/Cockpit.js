import React, {Component} from 'react';
import Navbar from "./Navbar";
import Viewer from "../DatabaseViewer/DatabaseViewer";

const ELASTIC_URL = "http://46.117.243.199:9200/ebay";
export const FILTERS_DICT = {1: "id", 2: "title", 3: "brand", 4: "epid"};

/**
 * Get an http response to a given url in a non-asynchronous fashion
 * @param url url to send request to
 * @param d optional data to send through
 * @returns {any} xmlHttp.response object
 */
export const httpGet = (url, d = null) =>
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(d);
    return xmlHttp.response;
};

class Cockpit extends Component
{

    /**
     * Initialize state and bind functions
     * @param props class properties
     */
    constructor(props)
    {
        super(props);
        this.state = {
            searchBox: "", // value of the searchBox for two-way binding
            searchButtonClicked: false, // search button was clicked
            radioValue: 1 // value for the radio button filters
        };
        // binding functions to this class
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    /**
     * Prevents the page from reloading and set the searchButtonClicked state variable to true
     * @param ev event of the button click
     */
    handleSearch = (ev) =>
    {
        ev.preventDefault();
        this.setState({searchButtonClicked: true});
    };

    /**
     * Handles any change in the search input. Implements two-way binding
     * @param event event of the change
     */
    handleSearchBoxChange = (event) =>
    {
        this.setState({
            searchBox: event.target.value,
            searchButtonClicked: false
        });
    };

    handleRadioChange = (value, event) =>
    {
        this.setState({radioValue: value});
    };

    /**
     * Renders navbar and displays the table
     * @returns {*}
     */
    render()
    {
        // Display navbar and data table
        return (
            <div>
                <Navbar inputValue={this.state.searchBox}
                        searchChanged={this.handleSearchBoxChange}
                        searchClicked={this.handleSearch}
                        radioChange={this.handleRadioChange}
                        radioValue={this.state.radioValue}
                        indices={this.state.indices}/>
                <Viewer searchClicked={this.state.searchButtonClicked}
                        index={ELASTIC_URL}
                        getFunc={httpGet}
                        query={this.state.searchBox}
                        filterValue={this.state.radioValue}
                />
            </div>
        );
    }
}


export default Cockpit;