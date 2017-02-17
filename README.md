# Node Poker
This project accpets specialized input as outlined in the data/sampleinput.txt and will determine the proper winner

#### Installation
```sh
$ npm install
```

#### Execution
Because this is designed to process a single file the node process will execute and then exit
```sh
$ npm run single
```

##### Options
Note the ommistion of "--" from the command line arguments
```sh
input=[FILEPATH] // To change from the default file path
$ npm run single input=./data/sampleinput.txt
```

##### Tests
```sh
$ npm run test
```

##### NodeJS
I chose to use NodeJS as a container for this project based on the projects requirement of an input file.  I know node
has file system operations built in as part of its core.  The other classes contained in this project are generic
ES6 classes and other than the method to export them, they could easliy be transitioned into any proejct. NodeJS also
provided the ability to organize the code effeciently by giving a method to include / require files direclty from the
file system.  The one drawback is that NodeJS does not yet support ES6 import/export natively.


#### So what doesn't it do
This project is not perfect but kowing its limitations is good.

 - CHEATERS: The system assumes that no one is cheating and that the deck has remained in tact.  Therefore it does not compare the cards in a set of hands (2H 3D 5S 9C KD 2C 3H 4S 8C AH) for duplicates.  This could be remedied by adding an additional check in poker.js.
 - ACES: During this proejct it occoured to me that in some instaces Aces are considered as a high card and in others it can be the low card.  For instance in Straights and Straight Flushes the Ace can be high (T,J,Q,K,A) or low (A,2,3,4,5).  This is not currently accounted for, but in theory it could be, by converting an Ace's value from 14 to 1 and then rechecking the hand for a valid Straight.  By dropping the value to 1 this also comes into play such that there is a tie, as we sholdn't count A,2,3,4,5 as an ace high straight, but a 5 high straight.
 - INPUT FILE PARSING: The input file parsing is not 100% and is falable, it does not take into account blank lines either between hands, or at the end of the file.  It assumes every line in the file are hands to be parsed.
 - ERRORS: There was a concious decision to not catch errors, therefore if an invalid Card, Suit or Hand is entered the application will halt, allowing the user to correct input immediately


#### The Data Dir
The data directory in the source was used for functional testing, and I decided to leav it in the repo for testing purposes
