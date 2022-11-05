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

    function OtherBooksByThisAuthor() {
        return (
            <div className="other-books">
                <p>All books by <span className="author-name">{author.name}</span>:</p>
                <ul>
                    {author.books.map(({title, id}) => (
                        <li book-id={id} key={id}>{title}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div book-id={currentBookId}>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <p>Publication year: {pubYear}</p>
            <p author-id={author.id}>Author: {author.name} ({author.years})</p>
            <OtherBooksByThisAuthor/>
        </div>
    );
}

export default BookDetails;
