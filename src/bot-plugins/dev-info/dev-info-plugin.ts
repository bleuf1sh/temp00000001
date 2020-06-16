import { UtilityBelt } from "../../components/utility-belt";
import { BasicSlackbotPlugin, BasicSlackbot, IncomingSlackMessage } from "../../components/basic-slackbot/basic-slackbot";
import { KeywordFinder } from "../../components/keyword-finder/keyword-finder";
import * as devInfoKeywords from './dev-info-keywords.json'


export class DevInfoPlugin implements BasicSlackbotPlugin {
  private uBelt = new UtilityBelt('DevInfoPlugin');
  private devInfoKeyworFinder = new KeywordFinder(devInfoKeywords);

  private codeBlockTicks = '```';
  private multiLineText: string[] = [
    'Created by Luke Allen lallen@pivotal.io',
    'with engineering help from Aaron Attar aattar@pivotal.io',
    '---------------------------',
    'PcfOne *PCF_PUSH_TIMESTAMP*',
    `${this.codeBlockTicks}`,
    `${process.env.PCF_PUSH_TIMESTAMP}`,
    `${this.codeBlockTicks}`,
    'Built from *GIT_COMMIT* (https://github.com/lxallen35/d_and_i_slackbot)',
    `${this.codeBlockTicks}`,
    `${process.env.GIT_COMMIT}`,
    `${this.codeBlockTicks}`,
  ];

  addDevInfoText(text: string) {
    this.multiLineText.push(text);
  }

  handleIncomingMessage(slackbot: BasicSlackbot, message: IncomingSlackMessage): void {
    if (slackbot.isMessageFromABot(message)) return;
    
    if (slackbot.isMessageFromUs(message)) return;

    if (!message.channel.startsWith('D')) return;

    if (!message.text) return;

    if (!message.text.includes('bot')) return;

    if (!this.devInfoKeyworFinder.isKeywordPresent(message.text)) return;

    this.uBelt.logInfo(`DevInfo Handler| ${this.uBelt.pretty(message)}`);

    let multiLineTextForSending: string[] = JSON.parse(JSON.stringify(this.multiLineText));

    multiLineTextForSending.push(`Bot Process Uptime: \`${this.uBelt.getPrettyUptime()}\``);

    slackbot.sendMessage(message.channel, message.user, multiLineTextForSending.join('\n'));
  }

}