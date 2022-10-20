const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
} = require("graphql");

const {
    BookGraphQlType,
    AuthorGraphQlType
} = require("./types");

const {BookDbModel} = require("../model/book");
const {AuthorDbModel} = require("../model/author");

const GraphQLMutations = new GraphQLObjectType({
    name: "GraphQLMutations",
    fields: {
        addAuthor: {
            type: AuthorGraphQlType,
            args: {
                name: {type: GraphQLString},
                years: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new AuthorDbModel({
                    name: args.name,
                    years: args.years,
                    age: args.age
                });
                return author.save();
            }
        },

        addBook: {
            type: BookGraphQlType,
            args: {
                title: {type: GraphQLString},
                genre: {type: GraphQLString},
                pubYear: {type: GraphQLInt},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = new BookDbModel({
                    title: args.title,
                    genre: args.genre,
                    pubYear: args.pubYear,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = {
    GraphQLMutations
};
