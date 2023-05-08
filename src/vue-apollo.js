import Vue from 'vue';
import { ApolloClient, split } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { from } from 'apollo-link';
// import { concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from '@vue/apollo-option';
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from '@apollo/client/link/ws';
// import { uncrunch } from 'graphql-crunch';
import { getMainDefinition } from '@apollo/client/utilities';
import { typeDefs } from './graphql/local-state/schema';
import { resolvers } from './graphql/local-state/resolvers';
import { data } from './graphql/local-state/initState';
import { TOKEN } from './constants/settings';

// Install the vue plugin
Vue.use(VueApollo);
// Http endpoint
// const httpEndpoint = 'https://rude-stingray-27.loca.lt/graphql';
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;
// const wsEndpoint = 'wss://slimy-eagle-54.loca.lt/graphql';
const wsEndpoint = process.env.VUE_APP_GRAPHQL_WS;
const httpEmailEndpoint = process.env.VUE_APP_EMAIL_HTTP;
// const httpEmailEndpoint = 'https://kind-emu-15.loca.lt/graphql';
const httpFilesEndpoint = process.env.VUE_APP_FILES_HTTP;
// const httpFilesEndpoint = 'https://bad-eel-35.loca.lt/graphql';
const httpImportsEndpoint = process.env.VUE_APP_IMPORTS_HTTP || '';
// const httpImportsEndpoint = 'http://localhost:3032/graphql';
const httpChartsEndpoint = process.env.VUE_APP_CHARTS_HTTP;
// const httpChartsEndpoint = 'https://giant-fly-17.loca.lt/graphql';
// const httpWhatsApp = process.env.VUE_APP_CHARTS_HTTP;

const httpLink = createHttpLink({
  uri: httpEndpoint,
});

const httpEmail = createUploadLink({
  uri: httpEmailEndpoint,
});

const httpImports = createUploadLink({
  uri: httpImportsEndpoint,
});

const httpFiles = createUploadLink({
  uri: httpFilesEndpoint,
});

const httpCharts = createUploadLink({
  uri: httpChartsEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  // console.log('authLink SET');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: wsEndpoint,
  options: {
    reconnect: true,
    timeout: 30000,
    lazy: true,
    connectionParams: () => {
      const token = localStorage.getItem(TOKEN);
      // console.log('wsLink SET ');
      return { Authorization: `Bearer ${token}` };
    },
    // onError: (error) => {
    //   console.log('wsLink ', error.message);
    // },
  },
});

// whatsApp socket
// const wsWhastApp = new WebSocketLink({
//   uri: 'ws://localhost:3000/graphql',
//   options: {
//     reconnect: true,
//     timeout: 30000,
//     lazy: true,
//     connectionParams: () => {
//       const token = localStorage.getItem(TOKEN);
//       // console.log('wsLink SET ');
//       return { Authorization: `Bearer ${token}` };
//     },
//     // onError: (error) => {
//     //   console.log('wsLink ', error.message);
//     // },
//   },
// });

// split whatsApp
// const splitLinkWhatsApp = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsWhastApp,
//   httpWhatsApp,
// );

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// Cache implementation
const cache = new InMemoryCache();

function writeInitialData() {
  cache.writeData({
    data,
  });
}

writeInitialData();

// const uncruncher = new ApolloLink((operation, forward) =>
//   forward(operation).map((response) => {
//     if (Array.isArray(response.data)) {
//       // eslint-disable-next-line
//       response.data = uncrunch(response.data);
//     }
//     return response;
//   }),
// );

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.length > 0) {
    graphQLErrors.forEach(({ message, statusCode }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, StatusCode: ${statusCode}`,
      );
      // Status code 400 - Don't have a token or the information is incomplete or bad format
      if (statusCode === 400) {
        console.log('Error - StatusCode: 400');

        // localStorage.removeItem(TOKEN);
        // if (window.location.pathname !== '/login') window.location = '/login';
      }
      // Status code 401 - Have a token but don't have permissions to the path or actions.
      if (statusCode === 401) {
        localStorage.removeItem(TOKEN);
        if (window.location.pathname !== '/login') window.location = '/login';
      }
      if (statusCode === 404) {
        console.log('Acción no existe en tu cuenta - StatusCode: 400');
      }
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Config
const defaultOptions = {
  link: from([errorHandler, authLink.concat(link)]),
  cache,
  typeDefs,
  resolvers,

  connectToDevTools: true,
};

// Config email
const defaultOptionsEmail = {
  link: from([errorHandler, authLink.concat(httpEmail)]),
  cache,
  connectToDevTools: false,
};

// whatsApp
// const defaultOptionsWhatsApp = {
//   link: from([errorHandler, authLink.concat(splitLinkWhatsApp)]),
//   cache,
//   connectToDevTools: false,
// };

// Config files
const defaultOptionsFiles = {
  link: from([errorHandler, authLink.concat(httpFiles)]),
  cache,
  connectToDevTools: false,
};

// imports
const defaultOptionsImports = {
  link: from([errorHandler, authLink.concat(httpImports)]),
  cache,
  connectToDevTools: false,
};

// Config charts
const defaultOptionsCharts = {
  link: from([errorHandler, authLink.concat(httpCharts)]),
  cache,
  connectToDevTools: false,
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const apolloClient = new ApolloClient({
    ...defaultOptions,
    ...options,
  });

  // Create email client
  const createEmailService = new ApolloClient({
    ...defaultOptionsEmail,
    ...options,
  });

  // Create files client
  const createFilesService = new ApolloClient({
    ...defaultOptionsFiles,
    ...options,
  });

  const createImportsService = new ApolloClient({
    ...defaultOptionsImports,
    ...options,
  });

  const createChartsService = new ApolloClient({
    ...defaultOptionsCharts,
    ...options,
  });

  // const createWhatsAppService = new ApolloClient({
  //   ...defaultOptionsWhatsApp,
  //   ...options,
  // });

  // apolloClient.wsClient = wsClient;
  apolloClient.onResetStore(writeInitialData);

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    clients: {
      email: createEmailService,
      files: createFilesService,
      imports: createImportsService,
      charts: createChartsService,
      // whatsApp: createWhatsAppService,
    },
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    // errorHandler(error) {
    //   console.log('Global error handler');
    //   console.error(error);
    // },
  });

  return apolloProvider;
}
