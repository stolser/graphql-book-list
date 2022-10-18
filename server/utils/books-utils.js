function isBookOfThisAuthor(parentAuthor) {
    return (book) => book.authorId === parentAuthor.id;
}

function orderBooksByPubYearAsc() {
    return (firstBook, secondBook) => firstBook.pubYear - secondBook.pubYear;
}

module.exports = {
    isBookOfThisAuthor,
    orderBooksByPubYearAsc
}
