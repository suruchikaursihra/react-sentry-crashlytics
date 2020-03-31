import React, { Component } from 'react';

class ExampleBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { eventId: props.throwError };
  }

  static getDerivedStateFromProps(props, state) {
    // return updated state on the bases of new props coming
    if (props.throwError === true) {
      return {
        eventId: true
      };
    } else {
      return null;
    }
  }

  render() {
    if (this.state.eventId) {
      throw new Error("YOLO");
    }
    return (
      <div>
        {/* when there's not an error, render children untouched */}
        {this.state.hasError ?
          <h1>Error.toString(): {this.state.toString()}</h1>
          // <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
          : this.props.children}
      </div>
    )
  }
}

export default ExampleBoundary;