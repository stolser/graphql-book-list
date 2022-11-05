import {ApolloClient, ApolloProvider, InMemoryCache, makeVar} from "@apollo/client";

import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";

export const defaultBookId = "6351844f27b4734628d5f652";
export const selectedBookId = makeVar(defaultBookId);

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
                <AddBookForm/>
            </div>
        </ApolloProvider>
    );
}
