import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { CardList } from "../component/cardlist";

export const SetList = props => {
	const { store, actions } = useContext(Context);
	const [currentSetID, setCurrentSetID] = useState("");
	const params = useParams();

	return (
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link0">
			<Row>
				<Col
					className="mx-auto"
					style={{ "overflow-x": "hidden", "overflow-y": "auto", height: "100vh" }}
					sm={4}>
					<ListGroup>
						{store.setList
							? store.setList.map((item, i) => {
									return (
										<ListGroup.Item
											key={i}
											action
											href={`#link${i}`}
											onClick={() => {
												setCurrentSetID(item.id);
												actions.setCurrentSetID(item.id);
											}}>
											<div className="row d-flex align-items-center">
												<div className="col-auto">
													<img
														style={{ height: "2em", "padding-left": "2em" }}
														src={item.images.symbol}
														alt=""
													/>
												</div>
												<div className="col text-center">{item.name}</div>
											</div>
										</ListGroup.Item>
									);
							  })
							: "name"}
					</ListGroup>
				</Col>
				<Col sm={8}>
					<Tab.Content>
						{store.setList ? (
							store.setList.map((item, i) => {
								return (
									<Tab.Pane key={i} eventKey={`#link${i}`}>
										<div className="row d-flex flex-column justify-content-center align-items-center">
											<div className="col d-flex justify-content-center">
												<img
													className="mt-2"
													style={{ height: "6em" }}
													src={item.images.logo}
													alt=""
												/>
											</div>

											<div>
												<Table striped bordered hover>
													<tbody>
														<tr>
															<td>Name:</td>
															<td>{item.name}</td>
														</tr>
														<tr>
															<td>Series:</td>
															<td>{item.series}</td>
														</tr>
														<tr>
															<td>Release Date:</td>
															<td colSpan="2">{item.releaseDate}</td>
														</tr>
														<tr>
															<td>Printed Total:</td>
															<td colSpan="2">{item.printedTotal}</td>
														</tr>
														<tr>
															<td>Actual Total:</td>
															<td colSpan="2">{item.total}</td>
														</tr>
													</tbody>
												</Table>
												<div
													className="cardList"
													style={{
														"overflow-x": "hidden",
														"overflow-y": "auto",
														height: "67vh"
													}}>
													<CardList setId={item.id} />
												</div>
											</div>
										</div>
									</Tab.Pane>
								);
							})
						) : (
							<li>hello</li>
						)}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

SetList.propTypes = {
	match: PropTypes.object
};
