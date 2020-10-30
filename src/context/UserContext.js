import React, { useReducer, createContext } from "react"

// Anonymous user.
const anon = {
  name: "Anonymous",
  status: 0
}

const UserContext = createContext(anon)
const { Provider, Consumer } = UserContext;

const UserStateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {

    switch(action.type) {
      case 'login':
        const newState = action.user
        return newState;

      case 'logout':
        return anon;

      default:
        throw new Error();
    };

  }, anon);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { UserContext, UserStateProvider, Consumer }
