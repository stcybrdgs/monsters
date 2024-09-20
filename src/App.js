import './App.css'
import { Component } from 'react'
import CardList from './components/card-list/card-list'
import SearchBox from './components/search-box/search-box'

class App extends Component {
  constructor() {
    super()
    this.state = {
      monsters: ['todd'],
      searchField: '',
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return {
              monsters: users,
              searchField: '',
              isLoaded: true,
            }
          },
          () => {}
        )
      )
  }

  onSearchChange = (event) => {
    this.setState(() => {
      return { searchField: event.target.value }
    })
  }

  filteredMonsters = () => {
    const searchTerm = this.state.searchField
    const monsters = this.state.monsters
    if (this.state.isLoaded) {
      if (searchTerm) {
        return monsters.filter((x) =>
          x.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      console.log('filtered')
    }
    return monsters
  }

  render() {
    const { onSearchChange, filteredMonsters } = this

    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox
          className='monsters-search-box'
          onChangeHandler={onSearchChange}
          placeHolder='Search monsters...'
        ></SearchBox>
        <CardList monsters={filteredMonsters()}></CardList>
      </div>
    )
  }
}

export default App

