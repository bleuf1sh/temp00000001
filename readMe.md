Github
---
https://github.com/lxallen35/d_and_i_slackbot

Be sure to add the environment variable SLACKBOT_TOKEN using the token that starts with xoxb-XXXXXXXXX

Dev Install Instructions
---
Uses node 10

Install dependencies
~~~~
npm install
~~~~

Run options
---

To run tests
~~~~
npm test
~~~~

To run locally
~~~~
npm start
~~~~

To dev locally (watching mode)
~~~~
npm run dev
~~~~

Transpile TS files into JS files saved to the **distJs** folder
~~~~
npm run makeJs
~~~~

To login to PCF One
~~~~
./pcfOneLogin.sh
~~~~

To push to PCF
~~~~
./pcfPush.sh
~~~~ 

Helpful Resources
---
1. https://api.slack.com/bot-users
1. https://www.npmjs.com/package/@slack/client
1. https://github.com/slackapi/node-slack-sdk
1. https://api.slack.com/events/message
1. https://api.slack.com/rtm
1. https://slack.dev/node-slack-sdk/web_api
1. https://api.slack.com/methods/chat.postEphemeral
