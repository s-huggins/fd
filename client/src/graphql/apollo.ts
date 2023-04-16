import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT}${process.env.REACT_APP_API_ROOT}`,
  cache: new InMemoryCache()
});

export default client;
