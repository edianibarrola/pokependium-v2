import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const CardHoverModal = props => {
	const { store, actions } = useContext(Context);

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{store.currentCard.data ? store.currentCard.data[0].name : "...card name loading"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div style={{ "overflow-x": "hidden", "overflow-y": "auto" }} className="row">
					<div className="col-12 d-flex justify-content-center mx-auto">
						<img
							style={{ height: "40vh" }}
							src={store.currentCard.data ? store.currentCard.data[0].images.large : "...image loading"}
							alt=""
						/>
					</div>

					<div className="col-12">
						<div className="col-12 text-center">Attacks</div>
						{store.currentCard.data
							? store.currentCard.data[0].attacks.map((attack, i) => {
									return (
										<div key={i} className="row d-flex justify-content-center align-items-center">
											<div className="col-2 text-center">{attack.name}</div>
											<div style={{ "border-left": "2px solid black" }} className="col-8">
												{attack.text}
											</div>
											<div className="col-2">{attack.cost}</div>
										</div>
									);
							  })
							: "...no attacks to show"}
						<div className="col-12 text-center">Card Info</div>
						{store.currentCard.data ? (
							<div className="row d-flex justify-content-center align-items-center">
								<div style={{ "border-right": "2px solid black" }} className="col-2 text-center">
									Released on {store.currentCard.data[0].set.releaseDate}
								</div>
								<div className="col-2">
									#{store.currentCard.data[0].number} of {store.currentCard.data[0].set.total} set
									total
								</div>
								<div className="col-2">Set Total {store.currentCard.data[0].set.total}</div>
								<div className="col-2">Actual Total {store.currentCard.data[0].set.printedTotal}</div>
								<div className="col-2">Artist {store.currentCard.data[0].artist}</div>
								<div className="col-2">Artist {store.currentCard.data[0].rarity}</div>
							</div>
						) : (
							"...no card info show"
						)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};
