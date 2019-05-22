import React, { Component } from 'react';
import { NumberWidget, IconWidget } from './Widget/index';
import { Row, Col } from 'reactstrap';
import {
  MdThumbsUpDown,
  MdThumbUp,
  MdThumbDown,
  MdLink,
  MdInsertInvitation,
  MdVisibility,
  MdTurnedIn,
  MdAccessTime
} from 'react-icons/md';

class ContainerWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, likes, dislikes, views, subscribers, published, url } = this.props.data
    return (
      <React.Fragment>
        <Row style={{ marginTop: 10 }} >
        <Col xs={4}>
            <IconWidget
              bgColor='success'
              icon={MdInsertInvitation}
              title='Name'
              subtitle={name}
            />
          </Col>
          <Col xs={4}>
            <IconWidget
              bgColor='primary'
              icon={MdThumbUp}
              title='Likes'
              subtitle={likes}
            />
          </Col>
          <Col xs={4}>
            <IconWidget
              bgColor='secondary'
              icon={MdThumbDown}
              title='Dislikes'
              subtitle={dislikes}
            />
          </Col>
        </Row>
          <Row style={{ marginTop: 10 }} >
            <Col xs={4}>
              <IconWidget
                bgColor='danger'
                icon={MdAccessTime}
                title='Date'
                subtitle={published}
              />
            </Col>
            <Col xs={4}>
              <IconWidget
                bgColor='warning'
                icon={MdVisibility}
                title='Views'
                subtitle={views}
              />
            </Col>
            <Col xs={4}>
              <IconWidget
                bgColor='info'
                icon={MdTurnedIn}
                title='Subscribers'
                subtitle={subscribers}
              />
            </Col>
          </Row>
        </React.Fragment>
    );
  }
};

export default ContainerWidget;
