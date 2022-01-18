import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import * as subscribeActions from "../Store/Reducer/Subscribe";
import store from "../Store"
import * as request from "./HTTPRequest";

export function withSubscribe(WrappedComponent) {
  const Providee = connect(
    state => ({
      email: state.userinfo.email,
      subscribe: state.subscribe
    }),
    {
      addEmail: subscribeActions.addEmail,
      deleteEmail: subscribeActions.deleteEmail
    }
  )(
    class extends Component {

      subscribe = (email, callback) => {
        if(this.props.email) {
          request
            .addSubscribe({ email: this.props.email, creatorEmail: email })
            .then(res => res.json())
            .then(subscribe => {
              if(subscribe.id) {
                this.props.addEmail(email); 
              }
              if(callback) {
                callback(!!subscribe.id);
              }
            })
            .catch(err => {
              console.error(err);
              if(callback) {
                callback(false);
              }
            }) 
        } else {
          if(callback) {
            callback(false);
          }
        }
      }
      unsubscribe = (email, callback) => {
        if(this.props.email) {
          request
            .removeSubscribe({ email: this.props.email, creatorEmail: email })
            .then(res => res.json())
            .then(json => {
              if(json.success) {
                this.props.deleteEmail(email);
              }
              if(callback) {
                callback(!!json.success);
              }
            })
            .catch(err => {
              console.error(err);
              if(callback) {
                callback(false);
              }
            }) 
        } else {
          if(callback) {
            callback(false);
          }
        }
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            subscribeInfo={this.props.subscribe}
            subscribe={this.subscribe}
            unsubscribe={this.unsubscribe}
          />
        );
      }
    }
  )

  return function (props) {
    return (
      <Provider store={store}>
        <Providee {...props} />
      </Provider>
    );
  };
}

export function SubscribeManager(props) {
  const Manager = connect(
    state => ({ email: state.userinfo.email }),
    { setEmails: subscribeActions.setEmails } 
  )(
    class extends Component {
      
      componentDidMount() {
        this.init();
      }
      init() {
        this.loadSubscribes(this.props.email).then(subscribes => {
          this.props.setEmails(subscribes.map(subscribe => subscribe.creatorEmail))
        });
      }
      async loadSubscribes(email) {
        if(email) {
          try {
            return await request
             .getSubscribesByType({ email, type: "intersted" })
             .then(res => res.json());
          } catch(err) {
            console.error(err);
            return [];
          }
        } else {
          return [];
        }
      }

      componentDidUpdate(prevProps) {
        if(prevProps.email !== this.props.email) {
          this.didChangeUser();
        }
      }
      didChangeUser() {
        this.init();
      }

      render() {
        return null;
      }
    }
  )

  return (
    <Provider store={store}>
      <Manager {...props} />
    </Provider>
  );
}
