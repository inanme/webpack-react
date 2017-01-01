import React from 'react';
import {render} from 'react-dom';

/*
import PRODUCTS from './components/thinking-in-react/products';
import {FilterableProductTable} from './components/thinking-in-react/components';
render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById('content'));
*/


import {Provider} from 'react-redux';
import {FilterableProductTableWithStore, appStore} from './components/thinking-in-react/components-redux';
render(
    <Provider store={appStore}>
        <FilterableProductTableWithStore/>
    </Provider>,
    document.getElementById('content'));
