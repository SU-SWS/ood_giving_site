import React, { useReducer, createContext } from "react"

// Anonymous user.
const defaultState = {
  user: {
    name: "Anonymous",
    status: 0
  }
}

const UserContext = createContext(defaultState)
const { Provider, Consumer } = UserContext;

const UserStateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {

    switch(action.type) {
      case 'login':
        return action;

      case 'logout':
        return defaultState;

      default:
        throw new Error();
    };

  }, defaultState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { UserContext, UserStateProvider, Consumer }
