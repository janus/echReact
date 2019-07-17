import * as React from "react";
import * as defs from "../definitions/definitions";
import { Action, ActionTypes } from "../actions/actionTypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { ViewChannel } from "./ViewChannel";
import {Row, Col, Container, Card, ListGroup, ListGroupItem, Alert} from "react-bootstrap";

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    channels: defs.Channel[] | null;
}

interface connectedDispatch {
    reloadChannels: () => Promise<void>;
}

type fullParams = params & connectedState & connectedDispatch;

const mapStateToProps = (state: defs.State): connectedState => ({
    channels: state.channels
});

const tempChannels: defs.Channel[] = [{
    channelId: 1,
    displayName: "General",
    canAnyoneInvite: true,
    isActiveDirectMessage: false,
    isGeneral: true,
    isPublic: true,
    ownerId: null
}, {
    channelId: 2,
    displayName: "Random",
    canAnyoneInvite: true,
    isActiveDirectMessage: false,
    isGeneral: false,
    isPublic: true,
    ownerId: 1
}, {
    channelId: 3,
    displayName: "Secret",
    canAnyoneInvite: false,
    isActiveDirectMessage: false,
    isGeneral: false,
    isPublic: false,
    ownerId: 1

}];

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    reloadChannels: async () => {
        //TODO: load data from server

        dispatch({
            type: ActionTypes.LOAD_CHANNELS,
            channels: tempChannels
        });
    }
});

interface loadState {}

class ChannelListComponent extends React.Component<fullParams, loadState> {

    componentDidMount() {
        this.props.reloadChannels();
    }

    render() {

        return (
          <Container>
              <Row>
                  <Col xs={12}>
                    <Card>
                        <Card.Header>Available Channels</Card.Header>
                        {
                            this.props.channels ?
                                <ListGroup>
                                    {
                                        this.props.channels.map(channel =>
                                            <ListGroupItem key={channel.channelId}>
                                                <Row>
                                                    <Col xs={6}>
                                                        {channel.displayName}
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Link to={`${this.props.match.url}/${channel.channelId}/view`}>
                                                            Open
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                            )
                                    }

                                </ListGroup> :
                                <Card.Body>Loading...</Card.Body>
                        }
                    </Card>
                  </Col>
              </Row>
              <Switch>
                  <Route path={`${this.props.match.url}/:channelId/view`} component={ViewChannel} />
                    <Route render={() => (<Alert >Please select a Channel</Alert>)}/>
              </Switch>
              <Row>
                    <Col xs={12}>
                        <Link to="/">
                            Return to home
                        </Link>
                    </Col>
              </Row>
          </Container>
        );
    }
}

export const ChannelList: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ChannelListComponent);