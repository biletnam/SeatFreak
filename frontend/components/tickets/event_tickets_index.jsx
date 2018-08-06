import React from 'react';
import { requestEvent } from '../../actions/event_actions';
import { connect } from 'react-redux';
import TicketIndexItem from './ticket_index_item';
import TicketView from './ticket_view';

class EventTicketsIndex extends React.Component {

  render() {
    if (!this.props.event) return null;

    if (!this.props.content) {
      const ticketItems = this.props.tickets.map(ticket => {
        return (
          <TicketIndexItem key={ticket.id} ticket={ticket} />
        );
      });

      let styles = {
        backgroundImage: `url(${this.props.event.photoUrl})`,
        backgroundSize: 'cover',
        overflow: 'hidden'
      };


      return (
        <div className="event-tickets-wrapper">
          <div className="navbar-compensator"></div>
          <div className="event-tickets-container">
            <div className="event-tickets-header">
              <h4>Amazing Deals</h4>
            </div>
            { ticketItems.length > 0 ?
              <ul className="tickets-list">
                {ticketItems}
              </ul> :
              <div className="empty-tickets-container">
                <h2>No tickets currently on sale for this event</h2>
              </div>
            }
          </div>
          <div className="event-image" style={styles}></div>
        </div>
      );
    } else {
      return (<TicketView />);
    }
  }
}

const mSP = (state, ownProps) => {
  const event = state.entities.events[ownProps.match.params.eventId];
  const tickets = Object.values(state.entities.tickets).filter(ticket => (ticket.eventId === event.id) && (ticket.onSale));

  let venue;
  if (event !== undefined) {
    venue = state.entities.venues[event.venueId];
  }
  
  return {
    event,
    tickets,
    venue,
    content: state.ui.showingTicket
  };
};

export default connect(mSP)(EventTicketsIndex);
