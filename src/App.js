import React, { Component } from "react";
import "./App.css";
import ExampleBoundary from "./ExampleBoundary";
import * as Sentry from "@sentry/browser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      throwError: false
    };
  }

  updateState = () => {
    this.setState({
      throwError: true
    });
  };

  componentDidMount() {
    if (this.state.throwError) {
      return true;
    } else {
      return false;
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId: eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="App">
        <header className="App-header"><h1>Something went wrong. You can see error logs in sentry.io issues console</h1>
        </header>
      </div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <button onClick={this.updateState}>
              Click Here to Throw Error
            </button>
            <ExampleBoundary throwError={this.state.throwError} />
            <h1>React Sentry Crashlytics</h1>
          </header>
        </div>
      );
    }
  }
}

export default App;
