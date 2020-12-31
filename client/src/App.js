import React, { useState } from 'react';

import {Modal, Form, Alert, Jumbotron ,Container, Button } from 'react-bootstrap';

import axios from 'axios'

import './App.css';


class JobForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      variant:  null,
      show: false,
      showModal: false,
      message: ''
    }
  }
  handleModal = () =>  this.setState({showModal: !this.state.showModal});

 handleSubmit = (event) => {
    event.preventDefault();

    var form = {};
    (new FormData(event.target)).forEach((value, key) => form[key] = value);

    const that = this;
    axios.post('/jd', form).then((response) => {
      that.setState({variant: 'info', show: true, message: "好啦，你的job 已经添加了，晚上会统一开始跑！" });
      return response.data;
  }).catch((err) => {
    console.log(err)
    if( err.response ){
      that.setState({ show: true, variant: 'danger',message: "不好，出现了意外，看看这个是否能帮到你。" + err.response.data.message.join(',')});
    }else{
      that.setState({ show: true, variant: 'danger',message: "不好，出现了意外，刷新页面重新试试？"});
    }
  });
  };

  render() {
    if (this.state.show === true) {
      return (<Alert key="1" variant={this.state.variant}>
        {this.state.message}
      </Alert>)
    }
    return (
      <>
        <center> <a href="#" onClick={this.handleModal}>咋用呢？</a> </center>
        <Modal show={this.state.showModal}>
        <Modal.Header closeButton onClick={this.handleModal}>
          <Modal.Title>Cookie 获取指南</Modal.Title>
        </Modal.Header>
        <Modal.Body><a href='https://github.com/lxk0301/jd_scripts/blob/master/backUp/GetJdCookie.md' target="blank">芝麻开门</a></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleModal}>
            知道啦
          </Button>
        </Modal.Footer>
        </Modal>
      <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="formPTKEY">
        <Form.Label>输入 Cookie 中的 pt_key</Form.Label>
        <Form.Control name="pt_key" type="text" placeholder="Enter PT_KEY" />
      </Form.Group>
      <Form.Group controlId="formPTPIN">
        <Form.Label>输入 Cookie 中的 pt_pin</Form.Label>
        <Form.Control name="pt_pin" type="text" placeholder="Enter PT_PIN" />
      </Form.Group>
      <Form.Group controlId="formSCKEY">
        <Form.Label>输入你 server酱 API key <a href='http://sc.ftqq.com/3.version'  target="blank">传送门</a></Form.Label>
        <Form.Control name="sc_key" type="text" placeholder="Enter SC_KEY" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
    );
  }
}

const App = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">来吧，一起薅羊毛</h1>
      <JobForm>
      </JobForm>
    </Jumbotron>
  </Container>
);

export default App;