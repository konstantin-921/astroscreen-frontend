import Page from 'components/Page'
import SearchInput from 'components/SearchInput'
import { withRouter } from "react-router"
import React from 'react'
import { Button, Alert } from 'reactstrap'
import ContainerWidget from '../components/ContainerWidgets'
import api from '../utils/api'
import config from '../config'
import matchYoutubeUrl from '../utils/validationYoutubeURL'

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      errorValidate: false
    };
  }

  redirectTo = () => {
    window.location.href = this.state.data.url;
  }

  saveData = () => {
    if(this.state.data) {
      api.post(`${config.BASE_URL}api/videos`, this.state.data)
      .then((data) => {
        console.log(data.data.message);
        this.props.history.push('/list')
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  handler = (e, value) => {
    e.preventDefault();
    const validation = matchYoutubeUrl(value)
    if(validation) {
      api.get(`${config.BASE_URL}api/videos/info?url=${value}`)
      .then((data) => {
        this.setState({ data: data.data, errorValidate: false })
      })
      .catch((error) => {
        console.log(error)
      });
    } else {
      this.setState({ errorValidate: true })
    }
  }

  render() {
    const errorMessage = this.state.errorValidate ? <Alert style={{ maxWidth: 195}} color="secondary">URL not valid</Alert> : null
    const containerDetails = this.state.data ? <ContainerWidget data={this.state.data} /> : null
    const previewButton = this.state.data ? <Button className="cr-search-form__button-send" color="info" onClick={this.redirectTo}>Preview</Button> : null
    const saveButton = this.state.data ? <Button className="cr-search-form__button-send" color="success" onClick={this.saveData}>Save</Button> : null
    return (
      <Page
        className="DashboardPage"
        title="Search"
        breadcrumbs={[{ name: 'Search', active: true }]}
      >
      <div style={{ display: 'flex', flexDirection: 'row'  }}>
          <SearchInput handler={this.handler} />
          {saveButton}
          {previewButton}
        </div>
        <div>{errorMessage}</div>
        {containerDetails}
      </Page>
    );
  }
}
export default withRouter(DashboardPage);
