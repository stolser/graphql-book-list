const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql;

//dummy data

const books = [
    {id: "1", title: "Fahrenheit 451", genre: "Dystopian", pubYear: 1953},
    {id: "2", title: "The Metamorphosis", genre: "Modernist fiction", pubYear: 1915},
    {id: "3", title: "Gulliver's Travels", genre: "Satire, fantasy", pubYear: 1726},
    {id: "4", title: "The Martian Chronicles", genre: "Sci-Fi", pubYear: 1950},
    {id: "5", title: "The Illustrated Man", genre: "Sci-Fi", pubYear: 1951}
];

const authors = [
    {id: "1", name: "Ray Bradbury", years: "1920 - 2012", age: 91},
    {id: "2", name: "Franz Kafka", years: "1883 - 1924", age: 40},
    {id: "3", name: "Jonathan Swift", years: "1667 - 1745", age: 77}
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        pubYear: {type: GraphQLInt}
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        years: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from the source
                console.log(`Getting a book with id=${args.id}`)
                return books.find(book => book.id === args.id);
            }
        },

        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from the source
                console.log(`Getting an author with id=${args.id}`)
                return authors.find(author => author.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
