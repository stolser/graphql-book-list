import {useMutation, useQuery} from "@apollo/client";

import {createNewBookM, getAllAuthorsQuery, getAllBooksQuery} from "./queries/queries"

function DisplayAllAuthors() {
    const {loading, error, data} = useQuery(getAllAuthorsQuery);

    if (loading) return <option disabled>Loading authors...</option>;
    if (error) return <option className="error" disabled>Error while loading authors!</option>;

    return data.authors.map(({name, years, id}) => (
        <option key={id} value={id}>{name} ({years})</option>
    ));
}

function AddBookForm() {
    let titleInput;
    let genreInput;
    let pubYearInput;
    let authorIdInput;
    const [createNewBook, {loading, error}] = useMutation(createNewBookM);

    if (loading) return (<div>'Submitting...'</div>);
    if (error) return (<div className="error">`Submission error! ${error.message}`</div>);

    const onSubmitCreateNewBook = e => {
        e.preventDefault();
        createNewBook({
            variables: {
                title: titleInput.value,
                genre: genreInput.value,
                pubYear: Number(pubYearInput.value),
                authorId: authorIdInput.value
            },
            refetchQueries: [{query: getAllBooksQuery}]
        }).then(r => {
                console.log(`Data returned from 'createNewBook' = ${JSON.stringify(r.data)}`);
            }
        );
    };

    return (
        <div>
            <form id="add-book" onSubmit={onSubmitCreateNewBook}>
                <h1>Add a new book</h1>
                <div className="field">
                    <label>Book title:</label>
                    <input type="text" ref={node => titleInput = node}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" ref={node => genreInput = node}/>
                </div>

                <div className="field">
                    <label>Publication year:</label>
                    <input type="text" ref={node => pubYearInput = node}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select ref={node => authorIdInput = node}>
                        <option>Select author</option>
                        <DisplayAllAuthors/>
                    </select>
                </div>

                <button type="submit">+</button>
            </form>
        </div>
    );
}

export default AddBookForm;
