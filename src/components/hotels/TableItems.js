/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
class TableItems extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }
    componentDidMount() {
        this.setState({items: this.props.items});
    }

  componentWillReceiveProps(nextProps) {
        if(this.state.items !== nextProps.items) {
            this.setState({items: nextProps.items});
        }
  }

    render() {

        if(this.state.items != null && this.state.items.length > 0){
            let rows = this.makeTableRows(this.state.items);
            return rows;
        }
        else return(
            <tr><td>No Data</td></tr>
        )
    }

    makeTableRows(items) {
        let rows = [];
        items.map((item) => {
            rows.push(
                <tr>
                    <td> <Link to={"/hotels/" + item.hotelId} className="table-link">{item.name}</Link></td>
                </tr>
            );
        });
        return rows;
    }
}

TableItems.propTypes = {
  items: PropTypes.array.isRequired
};

export default TableItems;