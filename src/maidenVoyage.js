//import logo from './logo.svg'
import './App.css'
import { Component, useState, useEffect } from 'react'
import axios from 'axios'

const ShoppingList = ({ items }) => {
  return (
    <div>
      <p>HELLO</p>
      <ul>
        {items.map((item, idx) => (
          <li key={`${item}-${idx}`}> {item} </li>
        ))}
      </ul>
    </div>
  )
}

const MyComponent = ({ title, alt, mydata }) => {
  return (
    <h1>
      {title} : {alt} : {mydata}
    </h1>
  )
}

const MyOtherComponent = ({ title, children }) => {
  if (!title) {
    return (
      <div>
        <h2>You had NO title</h2>
        {children}
      </div>
    )
  }
  return (
    <div>
      return <h2>{title}</h2>
      <p>render me before button</p>
      {children}
      <p>render me after button</p>
    </div>
  )
}

const Greeting = ({ children }) => {
  return children
}

const myList = ['Chinese', 'Music', 'Web Apps', 'Dogs']

/*
  Rem: you can fetch in a hook directly, but if you fetch in a component,
  then use useEffect(), which is best practice for handling functional
  side effectys in components
*/

function PeopleData() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        )
        setData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}

//function App() {
class App extends Component {
  constructor() {
    super()
    this.state = {
      monsters: ['todd'],
      searchField: '',
    }
  }

  componentDidMount() {
    // here, use native fetch, which returns a promise
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          // set state
          () => {
            return {
              monsters: users,
              searchField: '',
            }
          },
          // callback
          () => {
            console.log('state: ', this.state)
          }
        )
      )
  }

  testPrint = (val) => {
    console.log(val.toUpperCase())
  }

  onSearchChange = (event) => {
    console.log(event.target.value)

    this.setState(
      () => {
        return { searchField: event.target.value }
      },
      () => {
        console.log(this.state)
      }
    )
  }

  filteredMonsters = () => {
    const searchTerm = this.state.searchField
    const monsters = this.state.monsters
    if (searchTerm) {
      return monsters.filter((x) =>
        x.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return monsters
  }

  render() {
    const { onSearchChange, filteredMonsters } = this

    return (
      <div className='App'>
        <input
          className='serach-box'
          type='search'
          placeholder='search monsters...'
          onChange={onSearchChange}
        />

        {/* Monsters */}
        {filteredMonsters().map((monster, index) => {
          //console.log('search:', this.state.searchField)
          return (
            <h4 key={`${monster.name}-${index}`}>
              {monster.name}-{index}
            </h4>
          )
        })}

        {/* People */}
        <PeopleData></PeopleData>

        <MyComponent
          alt='My Alt'
          title='Hello World'
          mydata='my data is here!'
        />

        <MyOtherComponent title='My Maiden Voyage'>
          {this.state.name}
          <button
            onClick={() => {
              this.setState(
                // set state
                (state, props) => {
                  return {
                    name: 'Monster III',
                  }
                },
                // callback
                () => {
                  console.log('state: ', this.state)
                }
              )
            }}
          >
            Change Name
          </button>
        </MyOtherComponent>

        <MyOtherComponent>
          <p>!! No Title Voyage !!</p>
        </MyOtherComponent>

        <Greeting>
          <p>paragraph 01</p>
          <p>paragraph 02</p>
        </Greeting>

        <ShoppingList items={myList}></ShoppingList>
      </div>
    )
  }
}

export default App

