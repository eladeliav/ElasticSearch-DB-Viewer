import React, {Component} from 'react';
import {httpGet, FILTERS_DICT} from '../Cockpit/Cockpit';
import ReactTable from 'react-table';

class Viewer extends Component
{

    /**
     * Only updates this component if the next props specify that the search button has been clicked
     * @param nextProps next properties
     * @param nextState next state
     * @param nextContext next context
     * @returns {*} true if should update, else false
     */
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return nextProps.searchClicked;
    }

    /**
     * Gets the number of hits from an elasticsearch query
     * @param url url of elasticsearch server
     * @param getFunc http get function
     * @returns {number|*} either the max hits, or 0 if not found for some reason
     */
    getMaxHits = (url) =>
    {
        if (JSON.parse(httpGet(url)).hasOwnProperty("hits"))
            return JSON.parse(httpGet(url))["hits"]["total"]["value"];
        return 0;
    };

    /**
     * Get documents from elasticsearch index.
     * @returns {*[]} first element - docs, second element - # of hits
     */
    getDocs = (filterValue) =>
    {
        const index = this.props.index; //get url of index
        let response = ""; // http response
        let docs = ""; // received documents from elasticsearch
        let urlParams = `/_search?format=json`; // url params for searching

        if (this.props.query !== "") // add the query param if received a query
        {
            if(filterValue > 1)
                urlParams += "&q=" + FILTERS_DICT[filterValue] + ":" + this.props.query;
            else
                urlParams += "&q=" + this.props.query;
        }


        let url = index + urlParams; // final url var
        let maxHits = this.getMaxHits(url); // getting number of results
        url += "&size=" + maxHits; // setting url params to receive all data
        let d = null;
        if(this.props.query.startsWith('!'))
            d = `{"query":{"bool": {"must_not": {"term": {"name": ${this.props.query} }}}}}`; //adding 'not' search property if query starts with !

        if (maxHits !== 0) // if we received hits
        {
            response = JSON.parse(httpGet(url, d)); // get the data
            docs = response["hits"]["hits"]; // extract only the documents from it
            console.log(response);
        }
        return [docs, maxHits];
    };

    /**
     * Renders a table full of the received data from either, all the index or from a search of a specific query.
     * @returns {*} Table of data
     */
    render()
    {
        // getting docs info
        const docsInfo = this.getDocs(this.props.filterValue);
        const docs = docsInfo[0];
        const maxHits = docsInfo[1];

        // parsing all the data and organizing it
        let data = [];
        for (let doc in docs)
        {
            let current = docs[doc]['_source'];
            data.push({
                num: current['id'], // product #
                title: current['title'], // title of product
                brand: current['brand'], // product brand
                epid: current['epid'] // product epid (ebay product id)
            });
        }

        // column titles for the table
        const columns = [{
            Header: '#',
            accessor: 'num'
        }, {
            Header: 'Title',
            accessor: 'title',
        },
            {
                Header: 'Brand',
                accessor: 'brand'
            },
            {
                Header: "ePID",
                accessor: "epid"
            }];

        // render table with all of the data
        return (
            <div>
                <h1># of Result: {maxHits}</h1>
                <ReactTable
                    data={data}
                    columns={columns}
                    className="-striped -highlight"
                    defaultPageSize={20}
                />
            </div>
        );
    }
}

export default Viewer;
