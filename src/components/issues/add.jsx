import React from "react";
import { Mutation } from "react-apollo";
import {ADD_ISSUE} from "../../graphql"
const Add = () => {
    let input;
    return (
      <Mutation mutation={ADD_ISSUE}>
        {(add, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                add({ variables: { type: input.value } });
                input.value = '';
              }}
            >
              <input
                ref={node => {
                  input = node;
                }}
              />
              <button type="submit">Add Todo</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  };
  export default Add;