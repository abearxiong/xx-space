import React from "react";
import { Mutation } from "react-apollo";
import {UPDATE_ISSUE} from "../../graphql"
const Update = () => {
    let input;
    return (
      <Mutation mutation={UPDATE_ISSUE}>
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
              <button type="submit">Update Todo</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  };
  export default Update;