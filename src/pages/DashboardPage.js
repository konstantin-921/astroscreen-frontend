import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import SearchInput from 'components/SearchInput';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Alert,
} from 'reactstrap';
import { getColor } from 'utils/colors';
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
    const preview = this.state.data ? <Button className="cr-search-form__button-send" color="info" onClick={this.redirectTo}>Preview</Button> : null
    return (
      <Page
        className="DashboardPage"
        title="Search"
        breadcrumbs={[{ name: 'Search', active: true }]}
      >
      <div style={{ display: 'flex', flexDirection: 'row'  }}>
          <SearchInput handler={this.handler} />
          <Button 
            className="cr-search-form__button-send"
            color="success" 
            onClick={this.saveData}
          >
            Save
          </Button>
          {preview}
        </div>
        <div>{errorMessage}</div>
        {containerDetails}
      </Page>
    );
  }
}
export default DashboardPage;
