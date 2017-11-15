/**
 * Created by dcoyer on 11/10/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            headers: this.props.headers
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({items: nextProps.items});
        }
        if (nextProps.headers !== this.state.headers) {
            this.setState({headers: nextProps.headers});
        }
    }

    getHeaders = () => {
        let headers = this.state.headers;
        let count = headers.length;
        let tableHeaders = [];
        for (let i = 0; i < count; i++) {
            let tableHeader = <th>{headers[i]}</th>;
            tableHeaders.push(tableHeader);
        }
        return tableHeaders;
    };

    getBody = () => {
        let rows = [];
        let items = this.state.items;
        if(typeof  items[0].id === "object"){
            for (let item of items) {
                let row =
                    (<tr id={item.id}>
                        <td><Link to={this.props.baseUrl + "/" + item.id.hotelId + "/" + item.id.roomNumber}>{item.name}</Link></td>
                        <td>{item.pricePerNight}</td>
                    </tr>);
                rows.push(row);
            }
        }
        else{
            for (let item of items) {
                let row =
                    (<tr id={item.id}>
                        <td><Link to={this.props.baseUrl + "/" + item.id}>{item.name}</Link></td>
                        <td>{item.description}</td>
                    </tr>);
                rows.push(row);
            }
        }
        return rows;
    };

    render() {
        let headers = this.getHeaders();
        let body = this.getBody();
        return (
            <table className="table table-bordered table-striped">
                <tr>
                {headers}
                </tr>
                <tbody>
                {body}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    items: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    baseUrl: PropTypes.string.isRequired
};

export default Table;