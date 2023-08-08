import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/_app.scss';

import store from './store/store';
import RouterConfig from './RouterConfig';
import Layout from './elements/Layout';
import { BrowserRouter } from 'react-router-dom/dist';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<RouterConfig />
				</Layout>
			</BrowserRouter>
		</Provider>,
	</React.StrictMode>
);
