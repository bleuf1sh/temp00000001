import { UtilityBelt } from './components/utility-belt';
import { BasicSlackbot} from './components/basic-slackbot/basic-slackbot';
import { DiversityAndInclusionPlugin } from './bot-plugins/diversity-and-inclusion/diversity-and-inclusion-plugin';
import { DevInfoPlugin } from './bot-plugins/dev-info/dev-info-plugin';

const uBelt = new UtilityBelt('App');

// An access token (from your Slack app or custom integration - usually xoxb)
const SLACKBOT_TOKEN: string = process.env.SLACKBOT_TOKEN || 'xoxb-319957697234-544356817152-iUQGFkg0rkIi94HqQrDEUjht'; //SLACKBOT_TEST_WORKSPACE_TOKEN
if (!process.env.SLACKBOT_TOKEN) uBelt.logWarning(`env.SLACKBOT_TOKEN not provided, defaulting to SLACKBOT_TEST_WORKSPACE_TOKEN`); 

const slackbot: BasicSlackbot = new BasicSlackbot(SLACKBOT_TOKEN);

const diversityAndInclusionPlugin: DiversityAndInclusionPlugin = new DiversityAndInclusionPlugin();
slackbot.addPlugin(diversityAndInclusionPlugin);

const devInfoPlugin: DevInfoPlugin = new DevInfoPlugin();
devInfoPlugin.addDevInfoText("Diversity and Inclusion Keywords:");
devInfoPlugin.addDevInfoText("```");
devInfoPlugin.addDevInfoText(diversityAndInclusionPlugin.getKeywords());
devInfoPlugin.addDevInfoText("```");
slackbot.addPlugin(devInfoPlugin);

slackbot.start();
