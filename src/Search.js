import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

/*
  Component rendered search page
*/
const Search = (props) => {
    const {onSearch, searchResult, updateShelfData, shelfs, clearResult} = props

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
                 {searchResult.map((book) => (
                       <li key={ book.id }><Book book={book} shelfs={shelfs} updateShelfData={updateShelfData}/></li>
                  ))}
              </ol>
            </div>
         </div>
    )
}

Search.propTypes = {
     searchResult: PropTypes.array.isRequired,
     shelfs: PropTypes.array.isRequired,
     onSearch: PropTypes.func.isRequired,
     updateShelfData: PropTypes.func.isRequired,
     clearResult: PropTypes.func.isRequired
  }

export default Search
