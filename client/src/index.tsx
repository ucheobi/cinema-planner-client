import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/index.css';
import App from './components/App';
import { AUTH_TOKEN } from './constant';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
        </BrowserRouter>        
    </ApolloProvider>
  </React.StrictMode>
);

