## Description

react-tac-toe improves on the interactive tic-tac-toe game that is built following the official React [tutorial.](https://reactjs.org/tutorial/tutorial.html)

![react-tac-toe game](https://www.dropbox.com/s/7ryu07z9x8468zj/reacttactoe.png?raw=1)

## Features

Along with the core functionality of the classic gameplay, react-tac-toe displays a message indicating which player has won or the result is a draw and allows players to navigate to older versions of the game board by clicking on the list of stored moves. Additional features include a toggle button that sorts the moves list in either ascending or descending order and highlighting of the winning squares.

## Install react-tac-toe locally

1.  Fork the react-tac-toe repository to your GitHub account.
1.  Clone the repository in your account to your computer.
1.  Ensure that the most recent version of [Node.js](https://nodejs.org/) is installed.
1.  Running `npm start` from the project folder should open `http://localhost:3000` in the browser.
    If there are any issues with the setup, reference the official React [tutorial](https://reactjs.org/tutorial/tutorial.html)

## Challenges

The tutorial walks through building the game while explaining React concepts and design conventions including components, props and state. Each of the suggested improvements to reinforce these concepts were challenging. I think the main challenge for me was understanding the principle of lifting state to the parent component and passing data down to child components via props. This idea of one way data flow was particularly challenging when implementing the locations for each move in a certain format and adding the toggle feature. I also gained a better understanding the purpose for organizing code within components by keeping logic contained within the parent component to update state and out of the render method.

## Next Steps

I thought this was a good introductory project to start developing with React and understanding the core ideas of the library by starting with something simple. I'm excited build off the ideas learned through this tutorial and continue working towards more complex projects that incorporate a database and interesting API's.
