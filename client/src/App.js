import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GoogleMapReact from "google-map-react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  FormControl,
  InputGroup,
  Image,
  Table,
  Nav,
  Navbar
} from "react-bootstrap";
import homeSweetHome from "./assets/homesweethomeLOGO.png";
require("dotenv").config();
const axios = require("axios");

const AnyReactComponent = ({ text }) => (
  <div className="marker-div">
    <span role="img" aria-label="map-marker" className="marker-div-text">
      ⬅️
      {text}
    </span>
  </div>
);

class App extends Component {
  state = {
    data: null,
    ip: "",
    user: "Your",
    postData: null,
    searchTerm: null,
    failedRequest: null
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/api");
      //console.log("👉 Returned data:", response);
      this.setState({
        data: response.data,
        postData: null
      });
    } catch (e) {
      //console.log(`😱 Axios request failed: ${e}`);
    }
  }

  handleSubmitNew = async e => {
    e.preventDefault();
    let domain = e.target.elements.domain.value;
    this.setState({
      searchTerm: domain,
      data: null,
      postData: null,
      failedRequest: null
    });
    //console.log(domain);
    try {
      const response = await axios.post("/api", {
        body: domain
      });
      console.log("👉👉 POST Returned data:", response);
      if (response.data.data.status === "fail") {
        this.setState({
          searchTerm: null,
          data: null,
          postData: null,
          failedRequest: "Request Failed"
        });
      } else {
        this.setState({
          data: null,
          postData: response.data,
          failedRequest: null
        });
      }
    } catch (e) {
      //console.log(`😱 Axios request failed: ${e}`);
      this.setState({ searchTerm: null });
    }

    document.getElementById("domainSearch").reset();
  };

  render() {
    var response = this.state.data;
    var user = this.state.user;
    var postData = this.state.postData;
    var searchedTerm = this.state.searchTerm;
    let { failedRequest } = this.state;

    return (
      <div>
        <Container>
          <Row className="mt-1 justify-content-center">
            <Image className="home-sweet-logo" src={homeSweetHome}></Image>
          </Row>

          <Row className="mt-4"></Row>
          <Row className="mt-4 justify-content-center">
            <Col>
              <h4 style={{ textAlign: "center" }}>
                Find the location data of any domain or IP address!
              </h4>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <Container className="mt-3 mb-3">
                <Row className="justify-content-center">
                  <Col xs={11} md={6}>
                    <Form id="domainSearch" onSubmit={this.handleSubmitNew}>
                      <Form.Text className="text-muted none">
                        <strong>example: </strong>"google.com" or
                        "172.217.164.174"
                      </Form.Text>
                      <InputGroup className="mt-1 mb-3">
                        <FormControl
                          name="domain"
                          placeholder="domain or IP address"
                          aria-label="domain or IP address"
                          onChange={this.onChange}
                        />

                        <InputGroup.Append>
                          <Button
                            className="input-group-btn stock-search-button"
                            type="submit"
                          >
                            Search
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Enter 172.217.164.174 in your browser's search bar to be
                        taken to Google.com
                      </Form.Text>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Container>
            {/* Table 
            Test Area  
            */}

            <div>
              {response ? (
                <div>
                  <Row className="mt-4 justify-content-center">
                    <Col>
                      <h3 className="center-align-text ">
                        {user + " IP address is " + response.data.ip}
                      </h3>
                    </Col>
                  </Row>
                  <Row className=" mt-3 justify-content-center">
                    <Col md={9}>
                      <Table
                        variant="dark"
                        className="paper-shadow-class stock-table-background"
                        aria-label="simple table"
                      >
                        <tbody>
                          <tr className="stock-table-row">
                            <td>{"City"}</td>
                            <td>{response.data.city}</td>
                          </tr>

                          <tr className="stock-table-row">
                            <td>{"State"}</td>
                            <td>{response.data.region}</td>
                          </tr>

                          <tr className="stock-table-row">
                            <td className="hide-on-mobile">{"Country"}</td>
                            <td>{response.data.country}</td>
                          </tr>

                          <tr className="stock-table-row">
                            <td>{"ZIP"}</td>
                            <td>{response.data.postal}</td>
                          </tr>
                          <tr className="stock-table-row">
                            <td>{"ISP"}</td>
                            <td className="dont-break-out">
                              {response.data.org}
                            </td>
                          </tr>
                          <tr className="stock-table-row">
                            <td>{"Host"}</td>
                            <td className="dont-break-out">
                              {response.data.hostname}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </div>

            {response ? (
              <Row className="mt-4 justify-content-center">
                <div style={{ height: "50vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: process.env.REACT_APP_MAPS_API_KEY
                    }}
                    defaultCenter={{
                      lat: Number(
                        response.data.loc.substr(
                          0,
                          response.data.loc.indexOf(",")
                        )
                      ),
                      lng: Number(response.data.loc.split(",")[1])
                    }}
                    defaultZoom={11}
                  >
                    <AnyReactComponent
                      lat={Number(
                        response.data.loc.substr(
                          0,
                          response.data.loc.indexOf(",")
                        )
                      )}
                      lng={Number(response.data.loc.split(",")[1])}
                      text={response.data.ip}
                    />
                  </GoogleMapReact>
                </div>
              </Row>
            ) : null}
            <div>
              {failedRequest ? (
                <div>
                  <Row className="mt-4 justify-content-center">
                    <h3>Request Failed, please try again</h3>
                  </Row>
                </div>
              ) : null}
            </div>
            <div>
              {postData ? (
                <div>
                  <Row className="mt-4 justify-content-center">
                    <Col>
                      <h3 className="center-align-text ">
                        {"The IP address for " +
                          searchedTerm +
                          " is " +
                          postData.data.query}
                      </h3>
                    </Col>
                  </Row>
                  <Row className="mt-3 justify-content-center">
                    <Col md={9}>
                      <Table
                        variant="dark"
                        className="paper-shadow-class stock-table-background"
                        aria-label="simple table"
                      >
                        <tbody>
                          <tr className="stock-table-row">
                            <td>{"City"}</td>
                            <td>{postData.data.city}</td>
                          </tr>

                          <tr className="stock-table-row">
                            <td>{"State"}</td>
                            <td>{postData.data.regionName}</td>
                          </tr>

                          <tr className="stock-table-row">
                            <td>{"Country"}</td>
                            <td>{postData.data.country}</td>
                          </tr>

                          <tr className="stock-table-row">
                            <td>{"ZIP"}</td>
                            <td>{postData.data.zip}</td>
                          </tr>
                          <tr className="stock-table-row">
                            <td>{"ISP"}</td>
                            <td className="dont-break-out">
                              {postData.data.isp}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              ) : null}
              {postData ? (
                <Row className="mt-4 justify-content-center">
                  <div style={{ height: "50vh", width: "100%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: process.env.REACT_APP_MAPS_API_KEY
                      }}
                      defaultCenter={{
                        lat: postData.data.lat,
                        lng: postData.data.lon
                      }}
                      defaultZoom={11}
                    >
                      <AnyReactComponent
                        lat={postData.data.lat}
                        lng={postData.data.lon}
                        text={postData.data.query}
                      />
                    </GoogleMapReact>
                  </div>
                </Row>
              ) : null}
            </div>
          </Container>
        </Container>
        <footer className="main-app-footer hide-on-mobile">
          <Navbar className="footer-bg justify-content-center">
            <Nav className="justify-content-around">
              <Nav.Link className="pink-text" href="https://ryanfloyd.io">
                Project by Ryan Floyd
              </Nav.Link>
            </Nav>
          </Navbar>
        </footer>
      </div>
    );
  }
}

export default App;

/* 
  
                */
