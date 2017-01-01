import React, {Component} from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {connect} from 'react-redux';
import logger from 'redux-logger';
import _ from 'lodash';
import PRODUCTS from './products';

const initState = {
    filters: {

        filterText: 'ball',
        inStockOnly: true
    },
    products: PRODUCTS
};

const finalCreateStore = compose(applyMiddleware(logger()))(createStore);

const myReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE':
            return Object.assign({}, state, {filters: action.filters});
    }
    return state;
};

export const appStore = finalCreateStore(myReducer);

class ProductCategoryRow extends Component {
    render() {
        return (<tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>);
    }
}

class ProductRow extends Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends Component {
    render() {
        const {filterText, inStockOnly} = this.props.filters;
        const cats = _.groupBy(this.props.products, product => product.category);
        const rows = _.flatMap(cats, (prds, cat) =>
            [<ProductCategoryRow category={cat} key={cat}/>,
                ...prds.filter(product => inStockOnly ? product.stocked : true)
                    .filter(product => product.name.indexOf(filterText) > -1)
                    .map(product => <ProductRow product={product} key={product.name}/>)]
        );
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.dispatch({
                type: "CHANGE",
                filters: {
                    filterText: this.filterTextInput.value,
                    inStockOnly: this.inStockOnlyInput.checked
                }
            }
        );
    }

    render() {
        const {filterText, inStockOnly} = this.props.filters;
        return (
            <form>
                <input type="text" placeholder="Search..."
                       value={filterText}
                       ref={(input) => this.filterTextInput = input}
                       onChange={this.handleChange}
                />
                <p>
                    <input type="checkbox"
                           checked={inStockOnly}
                           ref={(input) => this.inStockOnlyInput = input}
                           onChange={this.handleChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBar dispatch={this.props.dispatch}
                           filters={this.props.filters}/>
                <ProductTable products={this.props.products}
                              filters={this.props.filters}
                />
            </div>
        );
    }
}
function msp(state) {
    return state;
}

export const FilterableProductTableWithStore = connect(msp)(FilterableProductTable);
