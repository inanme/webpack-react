import React from 'react';
import ReactDOM from 'react-dom';
import {FilterableProductTable, PRODUCTS} from './components/thinking-in-react/components';

//ReactDOM.render(<KanbanBoard cards={cardsList}/>, document.getElementById('content'));

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('content')
);