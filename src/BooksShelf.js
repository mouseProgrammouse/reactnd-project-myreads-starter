import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

/*
  Component rendered main page:
   - diff shelfs with user's book on it
*/
class BooksShelf extends Component {
  static propTypes = {
     shelfs: PropTypes.array.isRequired,
     books: PropTypes.array.isRequired,
     updateShelfData: PropTypes.func.isRequired
  }

  render () {
    const { books, shelfs, updateShelfData } = this.props;

    return (
      <div className='list-books'>
        <div className="list-books-title">
           <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
           {shelfs.map(shelf => (
           <div key={shelf.key} className="bookshelf">
               <h2 className="bookshelf-title">{shelf.title}</h2>
                 <div className="bookshelf-books">
                   <ol className="books-grid">
                      {books.filter(book => (book.shelf === shelf.key)).map((book, index) => (
                       <li key={ index.toString() }><Book book={book} shelfs={shelfs} updateShelfData={updateShelfData}/></li>
                      ))}
                   </ol>
                 </div>
            </div>
         ))}
        </div>
        <div className="open-search">
           <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksShelf