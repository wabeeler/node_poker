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
output=[FILEPATH] // To change the ouput file path
$ npm run single output=./data/sampleoutput.txt
```

Disucss Decision to use node
Has file handeling built in
Drawbacks: no ES6 import export support without third party libs
