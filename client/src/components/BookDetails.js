import {useQuery, useReactiveVar} from "@apollo/client";
import {getBookByIdQuery} from "./queries/queries"
import {selectedBookId} from "../App";

function BookDetails() {
    const currentBookId = useReactiveVar(selectedBookId);

    const {loading, error, data} = useQuery(getBookByIdQuery, {
        variables: {
            id: currentBookId
        }
    });

    if (loading) return <p>Loading the book...</p>;
    if (error) return <p className="error">Error while loading the book!</p>;
    if (!data || !data.book) return <p>Ooops, it seems there is no such a book :(</p>;

    const {title, genre, pubYear, author} = data.book;

    function ListBooksByThisAuthor() {
        return author.books.map(({title, id}) => (
            <p book-id={id} key={id}>{title}</p>
        ));
    }

    return (
        <div id="book-details" book-id={currentBookId}>
            <h1>Book details</h1>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <p>Publication year: {pubYear}</p>
            <p author-id={author.id}>Author: {author.name} ({author.years})</p>
            <p>All books by {author.name}:</p>
            <ul className="other-books">
                <ListBooksByThisAuthor/>
            </ul>
        </div>
    );
}

export default BookDetails;
