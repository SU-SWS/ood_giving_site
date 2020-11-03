import React, { useReducer, createContext } from "react"

const Anon = {
  name: "Anonymous",
  status: 0
}

// Anonymous user.
const defaultState = {
  user: Anon
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

export { UserContext, UserStateProvider, Consumer, Anon }
