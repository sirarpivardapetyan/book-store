import { $host } from '.';

const getBooks = async (search) => {
  const { data } = await $host.get(`/books?name_like=${search}`);
  return data;
};

const createBook = async (formData) => {
  const { data } = await $host.post('/books', formData);
  return data;
};

const updateBook = async (id,formData) => {
  const { data } = await $host.patch(`/books/${id}`, formData);
  return data;
};

const getBookById = async (id) => {
  const { data } = await $host.get(`/books/${id}`);
  return data;
};

const deleteBookById = async (id) => {
  const { data } = await $host.delete(`/books/${id}`);
  return data;
};

export { getBooks, createBook, getBookById, deleteBookById, updateBook };
