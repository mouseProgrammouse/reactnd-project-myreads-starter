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
    if (newShelf !== 'none') {
      //add a new book
        BooksAPI.get(bookToUpdate.id).then((newBook) => {
          newBook.shelf = newShelf
          books = books.concat(newBook)
        })
    }
    //update data on server
    BooksAPI.update(bookToUpdate,newShelf).then(() => {
      this.setState({ books })
    }).catch((error)=>{
      console.error('Something wrong with shelf update: '+error)
    })
  }

  getShelfsForSearch = (books, searchResult) => {
      return searchResult.map((resultBook)=>{
        //if find book on user's shelf return it
        const onShelf = books.filter((book)=>(book.id===resultBook.id))
        resultBook.shelf = 'none'//return book from search books without shelf
        return (onShelf.length !== 0)?onShelf[0]:resultBook
      })
  }

  //search books: for search uses BookAPI
  searchBooks = (query) => {
    query = query.trim()
    if (query) {
      BooksAPI.search(query).then((searchResult) => {
        if (searchResult.error === 'empty query')
          searchResult = []
        else {
          //update shelfs
          searchResult = this.getShelfsForSearch(this.state.books, searchResult)
        }
        this.setState({ searchResult })
      }).catch((error) => {
        console.error('Something wrong with search: '+error)
        this.setState(this.clearSearchResult())
      })
    }
    this.setState(this.clearSearchResult())
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
          <Search onSearch={this.searchBooks} shelfs={this.state.shelfs} searchResult={this.state.searchResult} updateShelfData={this.updateShelf} clearResult={this.clearSearchResult}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
