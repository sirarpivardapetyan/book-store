import React, { useEffect } from 'react';
import Books from '../../components/Books';
import SearchBar from '../../components/SearchBar';
import { getBooks } from '../../http/BookApi';
import { useDebounce } from '../../hooks/useDebounce';

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [deletedItem, setDeletedItem] = React.useState(false);
  const [changed, setChanged] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const searchQuery = useDebounce(search, 1000);
  const getAllBooks = async () => {
    try {
      const allbooks = await getBooks(searchQuery);
      setBooks(allbooks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllBooks();
     // eslint-disable-next-line
  }, [deletedItem, open, changed, search, searchQuery]);

  return (
    <div>
      <SearchBar
        open={open}
        setOpen={setOpen}
        setSearch={setSearch}
        search={search}
      />
      <Books
        books={books}
        setDeletedItem={setDeletedItem}
        setChanged={setChanged}
      />
    </div>
  );
};

export default Home;
