import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap'

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { handler } = this.props
    const { value } = this.state
    return (
      <Form inline className="cr-search-form" onSubmit={e => {
        e.preventDefault()
      }}
      >
          <Input
            type="text"
            name="text"
            className="cr-search-form__input"
            placeholder="Insert link . . ."
            onChange={this.handleChange}
          />
          <Button
            className="cr-search-form__button-send"
            color="success" 
            onClick={(e) => handler(e, value)}
            >
          Search
          </Button>
      </Form>
    );
  }
};

export default SearchInput;
