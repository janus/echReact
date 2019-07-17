import * as React from "react";
import * as defs from "../definitions/definitions";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { Action } from "../actions/actionTypes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Row, Col, Button, Card} from "react-bootstrap";
import {push} from "connected-react-router";
import { TiCancel} from "react-icons/ti";

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    channel: defs.Channel | null;
}

interface connectedDispatch {
    push: (url: string) => void;
}

const mapStateToProps = (state: defs.State, ownProps: params): connectedState => {
    if(state.channels) {
        const channelId = parseInt(ownProps.match.params.channelId);
        const channel = state.channels.find(channel => channel.channelId === channelId);

        if(channel) {
            return {
                channel
            };
        }
    }
    return {
        channel: null
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    push: url => dispatch(push(url))

});

type fullParams = params & connectedState & connectedDispatch;

interface localState {}

class ViewChannelComponent extends React.Component<fullParams, localState> {

    onClick(): void {
        this.props.push("/channels");
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Header>
                            Channel Id: {this.props.match.params.channelId}
                        </Card.Header>
                        <Card.Body>
                            {
                                this.props.channel ?
                                    <div>Channel Name: {this.props.channel.displayName}</div> :
                                    <div>Loading...</div>
                            }
                            <Link to='/channels'>
                                Close using a link
                            </Link>
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={this.onClick.bind(this)}>
                                <TiCancel /> Close
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export const ViewChannel: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ViewChannelComponent);