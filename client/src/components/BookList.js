import {useQuery} from "@apollo/client";

import {getAllBooksQuery} from "./queries/queries"

function DisplayAllBooks() {
    const {loading, error, data} = useQuery(getAllBooksQuery);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="error">Error while loading looks!</p>;

    return data.books.map(({title, genre, pubYear, id, author}) => (
        <li id={id} key={id}>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <p>Publication year: {pubYear}</p>
            <p>Author: {author.name}</p>
        </li>
    ));
}

function BookList() {
    return (
        <div id="book-list">
            <ul>
                <DisplayAllBooks/>
            </ul>
        </div>
    );
}

export default BookList;
