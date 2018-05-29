import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
  Component rendered information about book:
  cover image, title, authors, shelf
*/
class Book extends Component {
  static propTypes = {
     book: PropTypes.object.isRequired,
     shelfs: PropTypes.array.isRequired,
     updateShelfData: PropTypes.func.isRequired
     }
  
  render () {
    const { book, updateShelfData, shelfs } = this.props

    const coverStyle = {
      width: 128,
      height: 193,
      backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')'
    }

    return (
      <div className="book">
        <div className="book-top">
            <div className="book-cover" style={coverStyle}></div>
            <div className="book-shelf-changer">
               <select value={book.shelf} onChange={(e) => updateShelfData(e, book)}>
                  <option key="move" value="none" disabled>Move to...</option>
                  {shelfs.map((shelf) => (
                   <option key={shelf.key} value={shelf.key}> {shelf.title} </option>
                  ))}
                  <option key="none" value="none">None</option>
               </select>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
      </div>
    )
  }
}
      
export default Book
