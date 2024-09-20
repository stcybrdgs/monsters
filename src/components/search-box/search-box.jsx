import { Component } from 'react'
import './search-box.css'

class SearchBox extends Component {
  render() {
    console.log(this.props)
    const { onChangeHandler, placeHolder, className } = this.props

    return (
      <input
        type='search'
        className={`search-box ${className}`}
        placeholder={placeHolder}
        onChange={onChangeHandler}
      />
    )
  }
}

export default SearchBox

