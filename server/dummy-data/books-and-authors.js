const dummyBooks = [
    {id: "1", title: "Fahrenheit 451", genre: "Dystopian", pubYear: 1953, authorId: "1"},
    {id: "2", title: "The Metamorphosis", genre: "Modernist fiction", pubYear: 1915, authorId: "2"},
    {id: "3", title: "Gulliver's Travels", genre: "Satire, fantasy", pubYear: 1726, authorId: "3"},
    {id: "4", title: "The Martian Chronicles", genre: "Sci-Fi", pubYear: 1950, authorId: "1"},
    {id: "5", title: "The Illustrated Man", genre: "Sci-Fi", pubYear: 1951, authorId: "1"},
    {
        id: "6",
        title: "A Brief History of Time",
        genre: "Popular science",
        pubYear: 1988,
        authorId: "4"
    },
    {
        id: "7",
        title: "Effective Java, 3rd Edition",
        genre: "IT, Java programming",
        pubYear: 2017,
        authorId: "5"
    }
];

const dummyAuthors = [
    {id: "1", name: "Ray Bradbury", years: "1920 - 2012", age: 91},
    {id: "2", name: "Franz Kafka", years: "1883 - 1924", age: 40},
    {id: "3", name: "Jonathan Swift", years: "1667 - 1745", age: 77},
    {id: "4", name: "Stephen Hawking", years: "1942 - 2018", age: 76},
    {id: "5", name: "Joshua Bloch", years: "1961 - ", age: 61}
];

module.exports = {
    dummyBooks,
    dummyAuthors
};
