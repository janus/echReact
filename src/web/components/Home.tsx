import * as React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Container} from "react-bootstrap";
import {Counter} from "./Counter";

export class Home extends React.Component<{}> {
	constructor(p: {}) {
		super(p);
	
    }
	render() {
		return (
			<Container>
				<Row>
					<Col xs={6}>
						<Card>
							<Card.Header>App Root</Card.Header>
							<Card.Body><Counter /></Card.Body>
							<Card.Footer>
								<Link to="/channels">Go to channel list</Link>
							</Card.Footer>
						</Card>
					</Col>
					<Col xs={6}>
					<Card>
						<Card.Header>Work in progress</Card.Header>
						<Card.Body>To be completed</Card.Body>
						<Card.Footer>
							<Link to="/channels">For now still lead to channels</Link>
						</Card.Footer>
						</Card>
					</Col>
				</Row>
			</Container>

		);
	}
}

