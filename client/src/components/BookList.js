import {useQuery} from "@apollo/client";

import {getAllBooksQuery} from "./queries/queries"
import BookDetails from "./BookDetails";
import {selectedBookId} from "../App";

function DisplayAllBooks() {

    const {loading, error, data} = useQuery(getAllBooksQuery);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="error">Error while loading looks!</p>;
    if (!data || !data.books) return <p>There is no books!</p>;

    return data.books.map(({title, genre, pubYear, id, author}) => (
        <li book-id={id} key={id} onClick={() => selectedBookId(id)}>
            <h3>{title} <span>(by {author.name})</span></h3>
        </li>
    ));
}

function BookList() {
    return (
        <div>
            <BookDetails/>
            <ul id="book-list">
                <DisplayAllBooks/>
            </ul>
        </div>
    );
}

export default BookList;
