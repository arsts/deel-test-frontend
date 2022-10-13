# Deel questions

## #1 What is the difference between Component and PureComponent? give an example where it might break my app.

`PureComponent` handles `shouldComponentUpdate` and make shallow comparison of state and props. `Component` doesn’t make shallow comparison, hence it may rerender.

It might break an app

## #2 Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

In some cases when you optimised rerender with `ShouldComponentUpdate` or  `PureCompenent`, component could skip rerender despite an update via `Context` and fail to update the value.

## #3 Describe 3 ways to pass information from a component to its PARENT.

1. Pass function from the parent to the child component that accepts an argument which is the data from the child component
2. If you have to pass data from a deeply nested child and want to avoid props drilling, use `<Context.Provider>` to provide `data` and `setData` function. Use `useContext()` to consume in component and `setData` to change `data`
3. Use external store library like `redux`, `redux-toolkit`, `rematch` etc.

## #4 Give 2 ways to prevent components from re-rendering.

1. `Reac.PureComponent`
2. `React.memo` - HOC that make shallow comparison of props
3. `useMemo()` - recomputes memoized value only on deps change
4. `useCallback()` - for memoizing a function when passing it as a prop to child component. Allows to skip rerendering when comparing function reference.

## #5 What is a fragment and why do we need it? Give an example where it might break my app.

`<Reac.Fragment>…</React.Fragment>` or `<>…</>` is used to wrap multiple elements in component (since React expects a single element to be returned) instead of wrapping them with a `div`. 

Fragment does not add a real DOM Node, in case you attempt to manipualte it as a DOM node it might break your app.

## #6 Give 3 examples of the HOC pattern.

HOC or higher order component is pattern that means a function that takes a component and returns a different component. Similar to higher order functions. 

Here are some common examples:

```jsx
// react-router
withRouter(UserPage)
```

```jsx
// redux
connect(mapStateToProps, mapDispatchToProps)(UserPage)
```

```jsx
// Custom styles
const withStyling = (paragraph) => (props) => (
  <Paragraph {...props} style={{ fontWeight: bold, color: 'red' }} />
);
```

```jsx
// Protected Route
import React from "react";
import {withAuth} from "./withAuth.js"; // our auth logic

export class MyProtectedComponent extends React.Component {
    render() {
        return (
            <p>
                Protected page only authorised users can see 😎
            </p>
        );
    }
}

export default withAuth(MyPrivateComponent);
```

## #7 what's the difference in handling exceptions in promises, callbacks and async...await.

1. Promises - append `.catch()` at the end:

```jsx
fetch("https://some-url.com")
.then(resp => resp.json())
.catch(err => console.log(err) // error handling for promises
```

1. Callbacks - exceptions are handled by reserving the first argument for error and the second for successful response

```jsx
const doSomething = (err, data) => {
  if (err) {
    console.error("The was an error!", err)
    return
  }
  console.log(data)
}
```

1. Async…await - wrap your code in block of `try/catch/finally` 

```jsx
try {
  trySomething()
} catch (err) {
  logError(err)
} finally {
  finalOperation()
}
```

## #8 How many arguments does setState take and why is it async.

setState is async method and multiple setState’s get batched together before component rerender: 

1. the first is object or function to update state
2. The second an optional callback, that is called after state is changed

```jsx
setState()
```

## #9 List the steps needed to migrate a Class to Function Component.

1. Change syntax from component to function
    1. remove `this`
    2. remove constructor
    3. remove `render()` and leave `return()` 
2. Change class methods to simple functions
3. Replace react lifecycle methods with react hooks

## #10 List a few ways styles can be used with components.

1. Inline styles: style={margin: 0 auto}}
2. Simpe CSS file
3. CSS modules
4. CSS-in-JS (styled-components)
5. CSS pre and postprocessors (LESS, SCSS, PostCSS)

Cant remember more

## #12 How to render an HTML string coming from the server.

You can use `innerHTML` or `dangerouslySetInnerHTML` in React, but you shouldn’t unless you don’t sanitise (which is usually risky) this string beforehand, otherwise you run into the risk of having a script injected with an XSS attack.

```jsx
<div dangerouslySetInnerHTML={__html: 'Your html'} />;
```