import {gql, useQuery} from "@apollo/client";

const getAllBooksQuery = gql`
          query GetAllBooks {
            books {
              title
              genre
              pubYear
              id
              author {
                name
                years
                age
              }
            }
          }
`;

function DisplayAllBooks() {
    const {loading, error, data} = useQuery(getAllBooksQuery);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className="error">Error :(</p>;

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
