import React, { Component } from 'react'
import Page from 'components/Page'
import { withRouter } from "react-router"
import ContainerWidgets from '../components/ContainerWidgets'


class DetailsPage extends Component {

  render() {
    return (
      <Page
      className="DetailsPage"
      title="Details"
      breadcrumbs={[{ name: 'Details', active: true }]}
      >
        <ContainerWidgets data={this.props.history.location.state.data} />
      </Page>
    );
  }
};

export default withRouter(DetailsPage);
