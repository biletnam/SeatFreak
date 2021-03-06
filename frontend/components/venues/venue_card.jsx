import React from 'react';
import { connect } from 'react-redux';
import { track, untrack } from '../../actions/tracking_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

class VenueCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageView: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTracking = this.handleTracking.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({
      imageView: true
    });
  }
  
  handleTracking (e) {
    if (this.props.loggedIn) {
      if (this.props.tracked) {
        this.props.untrack({ trackable_type: "Venue", trackable_id: this.props.venue.id });
      } else {
        this.props.track({ trackable_type: "Venue", trackable_id: this.props.venue.id });
      }

      e.stopPropagation();
    } else {
      e.stopPropagation();
      this.props.openLoginModal();
    }
  }

  handleClick () {
    this.props.history.push(`/venues/${this.props.venue.id}`);
  }

  render() {
    
    return (
      <div className="item-card" onClick={this.handleClick}>
        <div className="item-card-artwork loading-gif">
          <img src={this.props.venue.photoUrl} onLoad={this.handleLoad} className={this.state.imageView ? "image-shown" : "image-hidden"}/>
          <div className="trackButton" onClick={this.handleTracking}>
            <i className={`fa-heart ${ this.props.tracked ? "fas tracked" : "far"}`}></i>
          </div>
        </div>
        <div className="item-card-info" >
          <h1>{this.props.venue.name}</h1>
          <h3>{this.props.venue.city}</h3>
        </div>
      </div>
    );    
  }
  
};

const mSP = (state, ownProps) => {
  let trackedVenues = [];

  if (state.entities.currentUser.trackedItems) {
    trackedVenues = state.entities.currentUser.trackedItems.trackedVenues;
  }

  let tracked = trackedVenues.includes(ownProps.venue.id);

  return {
    loggedIn: Boolean(state.session.id),
    tracked
  };
};

const mDP = dispatch => {
  return {
    track: item => dispatch(track(item)),
    untrack: item => dispatch(untrack(item)),
    openLoginModal: () => dispatch(openModal("login"))
  };
};

export default withRouter(connect(mSP, mDP)(VenueCard));
