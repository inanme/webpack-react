import React, {Component} from 'react';
import _ from 'lodash';

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
                    .filter(product => product.name.indexOf(filterText)> -1)
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
        this.props.onUserInput(
            this.filterTextInput.value,
            this.inStockOnlyInput.checked
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

export class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: 'ball',
            inStockOnly: true
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, inStockOnly) {
        this.setState({filterText, inStockOnly});
    }

    render() {
        return (
            <div>
                <SearchBar onUserInput={this.handleUserInput}
                           filters={this.state}/>
                <ProductTable products={this.props.products}
                              filters={this.state}
                />
            </div>
        );
    }
}
