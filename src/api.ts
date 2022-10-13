export const getDataFromApi = async (
    searchTerm: string
) => {
    try {
        const response = await fetch(`http://openlibrary.org/search.json?title=${searchTerm}&limit=10`);
        const books = await response.json();
        // TODO interface for books
        const result = books?.docs?.map((doc: any) => {
            return doc?.title_suggest;

        })
        return result;
    } catch (e) {
        console.log(e)
    }
};