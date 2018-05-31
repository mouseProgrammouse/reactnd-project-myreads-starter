import React from 'react'
import PropTypes from 'prop-types'

/*
  Component rendered information about book:
  cover image, title, authors, shelf
*/
const Book = (props) => {
    const { book, updateShelfData, shelfs } = props

    const coverStyle = {
      width: 128,
      height: 193
    }

    if (book.imageLinks.smallThumbnail)
      coverStyle.backgroundImage = 'url(' + book.imageLinks.smallThumbnail + ')'

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
  //}
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired,
    updateShelfData: PropTypes.func.isRequired
    }

export default Book
