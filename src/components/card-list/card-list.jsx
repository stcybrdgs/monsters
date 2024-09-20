import { Component } from 'react'
import CardContainer from '../card-container/card-container'
import './card-list.css'

class CardList extends Component {
  render() {
    const { monsters } = this.props

    return (
      <div className='card-list'>
        {monsters.map((monster) => {
          const { id, name, email } = monster
          return (
            <CardContainer
              key={id}
              id={id}
              name={name}
              email={email}
            ></CardContainer>
          )
        })}
      </div>
    )
  }
}

export default CardList

