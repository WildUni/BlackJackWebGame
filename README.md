# BlackJackWebGame
This is a simple attempt in recreating the classic Black Jack poker game. The game supports multiplayer game rooms, where each room allows up to 3 players.

To get started:
- git clone the repository 
- make sure you have node installed on your device, cd into the game folder, and into my-black-jack...., and run npm install, which should install all the dependencies.
- do npm start to start the server. It is currently hardcoded to port 3001. Use npm run dev to access the client landing page. You can also use other softwares to host a nonlocal server accessible by other people.

Once you start the server, and arrive at the landing page:
- Enter a username, which would lead you to the gamehub
- You can create a room by leaving the the game Id empty, or join a room by entering a six character room Id
- All players in a game room must be ready for the game to start

Game Logistics:
- You will be asked to place a bet after all players are ready.
- If you have sufficient funds and did not place a bet by the end of the timer, a forced bet will be placed for you, else you would not be given a hand.
- After receiving your hand, you will be asked to double down, unless you hit blackjack on initial distribution. You can double down as many times as you would like, but this is limited by your balance.
- Splitting hands while you have insufficient funds will result in all your remaining balance going to the new hand.
- During the action phase, you are only allowed to take an action if the current hand in play is yours. You will know once it's your turn when the action buttons show up. A hand that hits 21, or higher will automatically be set to not in play.
- During the reveal phase, the dealer will reveal cards until they have a minimum of 17 in card value.
- Reward calculation will follow typical black jack rules. There are no bonus multipliers.


Language: TypeScript
Modules: 
- Node.js for organization and packet management
- React for single page applications, and custom HTML elements
- Tailwind for display and small animations.
- Socket.io for real time interactions between the server and its players.

Note that this is a simple attempt at recreating the classic game of Blackjack. 
- The game currently does not support authentication and saved files.
- Bugs are to be expected. 
- The game is still missing card related animations, such as card distribution and card reveals.
- There is a profile page that only displays your name and balance. The game history is simply a template as of now.
- There are still a lot of optimization to be done!




