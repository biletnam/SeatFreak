import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    if (!this.props.currentUser) return null;
    let dropdown;
    if (this.state.isOpen) {
      dropdown = () => (
        <ul className="user-links">
          <li onClick={this.handleLogout}><span>Logout</span></li>
        </ul>
      );
    } else {
      dropdown = () => null;
    }

    return (
      <div className="user-dropdown" onMouseEnter={this.handleOpen} onMouseLeave={this.handleClose}>
        <Link to='/account' >
          <div className="user-name">
            <h2>{this.props.currentUser.fName}</h2>
          </div>
        </Link>
        { dropdown() }
      </div>
    );
  }
}

const mSP = state => {
  return {
    currentUser: state.entities.currentUser
  }
};

const mDP = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mSP, mDP)(UserDropdown));