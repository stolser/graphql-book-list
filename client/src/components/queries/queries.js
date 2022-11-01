import {gql} from "@apollo/client";

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

const getBookByIdQuery = gql`
          query GetBookById($id: ID!) {
              book(id: $id) {
                title
                genre
                pubYear
                author {
                  id
                  name
                  years
                  books {
                    title
                    id
                  }
                }
              }
          }
`;

const getAllAuthorsQuery = gql`
          query GetAllAuthors {
            authors {
              name
              years
              id
            }
          }
`;

const createNewBookM = gql`
          mutation CreateNewBook($title: String!, $genre: String!, $pubYear: Int!, $authorId: ID!) {
            addBook(title: $title, genre: $genre, pubYear: $pubYear, authorId: $authorId){
                title
                genre
                pubYear
                id
            }
          }
`;

export {
    getAllBooksQuery,
    getBookByIdQuery,
    getAllAuthorsQuery,
    createNewBookM
};
