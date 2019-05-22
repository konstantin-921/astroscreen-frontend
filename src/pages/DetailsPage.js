import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { withRouter } from "react-router"
import ContainerWidgets from '../components/ContainerWidgets'


class DetailsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContainerWidgets data={this.props.history.location.state.data} />
    );
  }
};

export default withRouter(DetailsPage);
