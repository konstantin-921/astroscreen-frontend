import Page from 'components/Page'
import React from 'react';
import { withRouter } from "react-router"
import { Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { MdLiveTv } from 'react-icons/md'
import { IconWidget } from '../components/Widget/index'
import api from '../utils/api'
import config from '../config'

class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      currentPage: 0,
      totalPage: 0,
      detailsVideo: null
    };
    this.per = 5
  }

  handleClick = (e, index) => {
    e.preventDefault();
    api.get(`${config.BASE_URL}api/videos?page=${index}&per=${this.per}`)
    .then((data) => {
      this.setState({ currentPage: index, data: data.data.data, totalPage: Math.ceil(data.data.total/this.per), loading: false })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  getDetails = (id) => {
    api.get(`${config.BASE_URL}api/videos/${id}`)
    .then((data) => {
      const x = { pathname: '/details', state: { data: data.data} }
      this.props.history.push(x)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidMount() {
    api.get(`${config.BASE_URL}api/videos?page=0&per=${this.per}`)
    .then((data) => {
      this.setState({ data: data.data.data, totalPage: Math.ceil(data.data.total/this.per), page: Number(data.data.page), loading: false })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { loading, currentPage } = this.state
    if(loading === true) { return null }
    return (
      <React.Fragment>
        <Page
          className="ListPage"
          title="List"
          breadcrumbs={[{ name: 'List', active: true }]}
        >
        <div style={{ marginBottom: '15px' }}>
          {this.state.data
            .map((elem, i) => 
              <Row style={{ marginTop: '15px' }} key={i}>
                <Col xs={6}>
                    <IconWidget
                      bgColor='dark'
                      onClick={() => this.getDetails(elem.id)}
                      icon={MdLiveTv}
                      title={elem.name}
                    />
                </Col>
              </Row>
          )}
        </div>
        <Pagination aria-label="Page navigation example">
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={e => this.handleClick(e, currentPage - 1)}
            previous
            href="#"
          />
          </PaginationItem>
            {[...Array(this.state.totalPage)].map((page, i) => 
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}
          <PaginationItem disabled={currentPage >= this.state.totalPage - 1}>
            <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
          </PaginationItem>

        </Pagination>
        </Page>
      </React.Fragment>
    );
  }
}

export default withRouter(ListPage);