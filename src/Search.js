import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

/*
  Component rendered search page
*/
class Search extends Component {
  static propTypes = {
     books: PropTypes.array.isRequired,
     searchResult: PropTypes.array.isRequired,
     shelfs: PropTypes.array.isRequired,
     onSearch: PropTypes.func.isRequired,
     updateShelfData: PropTypes.func.isRequired,
     clearResult: PropTypes.func.isRequired
  }


  updateShelfs = (books, searchResult) => {
      return searchResult.map((resultBook)=>{
        //if find book on user's shelf return it
        const onShelf = books.filter((book)=>(book.id===resultBook.id))
        resultBook.shelf = 'none'//return book from search books without shelf
        return (onShelf.length !== 0)?onShelf[0]:resultBook
      })
  }

  render () {
    const {onSearch, books, searchResult, updateShelfData, shelfs, clearResult} = this.props

    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' onClick={clearResult}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e)=>{ onSearch(e.target.value) }}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                 {this.updateShelfs(books, searchResult).map((book) => (
                       <li key={ book.id }><Book book={book} shelfs={shelfs} updateShelfData={updateShelfData}/></li>
                  ))}
              </ol>
            </div>
         </div>
    )
  }
}

export default Search
