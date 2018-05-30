import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import BooksShelf from './BooksShelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    shelfs: [{key:'currentlyReading', title: 'Currently Reading'},
             {key:'read', title: 'Read'},
             {key:'wantToRead', title: 'Want To Read'}],
    books: [],
    searchResult: []
  }

  //get user's book
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //change book's shelf
  updateShelf = (e, bookToUpdate) => {
    const newShelf = e.target.value
    let books = this.state.books.filter((book) => (book.id !== bookToUpdate.id))
    console.log(bookToUpdate)
    if (newShelf !== 'none') {
      //add a new book
      BooksAPI.get(bookToUpdate.id).then((newBook) => {
        newBook.shelf = newShelf
        books = books.concat(newBook)
        this.setState({ books })
      })
    } else //"delete" book
      this.setState({ books })
    //update data on server
    BooksAPI.update(bookToUpdate,newShelf)
  }

  //search books: for search uses BookAPI
  searchBooks = (query) => {
    query = query.trim()
    if (query) {
      BooksAPI.search(query).then((searchResult) => {
        if (searchResult.error === 'empty query')
          searchResult = []
        this.setState({ searchResult })
      }).catch((error) => {
        console.error('Something wrong with search: '+error)
        this.setState({ searchResult: [] })
      })
    }
    this.setState({ searchResult: [] })
  }

  clearSearchResult = () => {
    this.setState({
      searchResult: []
    })
  }

  render() {

    return (
      <div className="app">
       <Route exact path='/' render={() => (
          <BooksShelf books={this.state.books} shelfs={this.state.shelfs} updateShelfData={this.updateShelf}/>
        )} />
        <Route path='/search' render={() =>(
          <Search onSearch={this.searchBooks} shelfs={this.state.shelfs} books={this.state.books} searchResult={this.state.searchResult} updateShelfData={this.updateShelf} clearResult={this.clearSearchResult}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
