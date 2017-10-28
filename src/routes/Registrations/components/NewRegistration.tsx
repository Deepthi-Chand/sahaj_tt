import * as React from 'react';
import { Component } from 'react';
import { Registration } from '../../../api';
import { Props } from '../containers/NewRegistration';

export class NewRegistration extends Component<Props, {}> {
  dateInput: HTMLInputElement;
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { signUp } = this.props;
    return (
      <div>
        <h2>Add Registration</h2>
        <hr />
        <div className="page-register">
          <input ref={element => this.dateInput = element} />
          <button onClick={() => signUp(this.dateInput.value)}> register </button>
        </div>
      </div>
    );
  }
}
