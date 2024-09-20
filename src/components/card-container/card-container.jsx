import { Component } from 'react'
import './card-container.css'

class CardContainer extends Component {
  render() {
    const { id, name, email } = this.props

    return (
      <div className='card-container' key={id}>
        <img
          src={`https://robohash.org/${id}?set=set2&size=180x180`}
          alt={`Monster ${name}`}
        />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    )
  }
}

export default CardContainer

