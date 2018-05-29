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
      searchResult.map((resultBook)=>{
        const onShelf = books.filter((book)=>(book.id===resultBook.id))
        return (onShelf.length !== 0)?onShelf:resultBook.shelf = 'none'
      })
  }

  render () {
    const {onSearch, books, searchResult, updateShelfData, shelfs, clearResult} = this.props

    this.updateShelfs(books, searchResult)

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
                 {searchResult.map((book, index) => (
                       <li key={ index.toString() }><Book book={book} shelfs={shelfs} updateShelfData={updateShelfData}/></li>
                  ))}
              </ol>
            </div>
         </div>
    )
  }
}

export default Search