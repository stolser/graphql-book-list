import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

import BookList from "./components/BookList";

const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
});

export default function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <div id="main">
                <h1>A book list</h1>
                <BookList/>
            </div>
        </ApolloProvider>
    );
}
