import { UtilityBelt } from '../utility-belt';
const { RTMClient } = require('@slack/client');
const { WebClient } = require('@slack/client');

export interface BasicSlackbotPlugin {
  handleIncomingMessage(slackbot: BasicSlackbot, message: IncomingSlackMessage): void;
}

/** For structure of `message`, see https://api.slack.com/events/message */
export interface IncomingSlackMessage {
  type: string;
  subtype?: string;
  user: string;
  text: string;
  client_msg_id?: string;
  team: string;
  channel: string;
  event_ts?: string;
  thread_ts?: string;
  ts: string;
}

export class BasicSlackbot {
  readonly uBelt: UtilityBelt;
  readonly basicSlackbotPluginList: BasicSlackbotPlugin[];
  readonly slackbotToken: string;
  readonly rtmClient;
  readonly webClient;

  constructor(slackbotToken: string) {
    this.uBelt = new UtilityBelt('BasicSlackbot');
    this.basicSlackbotPluginList = [];
    this.slackbotToken = slackbotToken;
    this.rtmClient = new RTMClient(slackbotToken);
    this.webClient = new WebClient(slackbotToken, {
      maxRequestConcurrency: 100, // Allow up to XX requests to be in-flight at a time
    });

    this.rtmClient.on('connecting', () => this.uBelt.logInfo('slackbot is connecting...'));
    this.rtmClient.on('authenticated', (resp) => this.uBelt.logInfo(`slackbot is authenticated as: ${this.uBelt.pretty(resp, 0)}`));
    this.rtmClient.on('connected', () => this.uBelt.logInfo('slackbot is connected :)'));

    this.rtmClient.on('disconnecting', () => this.uBelt.logInfo('slackbot is disconnecting...'));
    this.rtmClient.on('disconnected', () => this.uBelt.logInfo('slackbot is disconnected :('));

    this.rtmClient.on('reconnecting', () => this.uBelt.logInfo('slackbot is reconnecting...'));
    this.rtmClient.on('error', (resp) => this.uBelt.logError(`slackbot has encountered an error :( ${this.uBelt.pretty(resp)}`));

    this.rtmClient.on('message', (message: IncomingSlackMessage) => {

      this.uBelt.logDebug(`rtmClient.on('message'):${this.uBelt.pretty(message)}`);
      
      for (let basicSlackbotPlugin of this.basicSlackbotPluginList) {
        try { basicSlackbotPlugin.handleIncomingMessage(this, message); }
        catch(e) { this.uBelt.logError(`${e}`) }
      }
    });
  
  }

  addPlugin(basicSlackbotPlugin: BasicSlackbotPlugin) {
    this.basicSlackbotPluginList.push(basicSlackbotPlugin);
  }

  start() {
    this.rtmClient.start();
  }

  isMessageFromABot(message: IncomingSlackMessage): boolean {
    if (message.subtype && message.subtype === 'bot_message') return true;
    else return false;
  }

  isMessageFromUs(message: IncomingSlackMessage): boolean {
    if (!message.subtype && message.user === this.rtmClient.activeUserId) return true;
    else return false;
  }

  sendEphemeralMessage(channel: string, user: string, attachmentText: string, 
    attachmentSubText: string=undefined, attachmentFooterText: string=undefined, 
    asUser=false, thread_ts=undefined) {
  
    this.uBelt.logDebug(`sendEphemeralMessage(${channel}, ${user})`)
    const message = {
      'channel': channel,
      'user': user,
      'as_user': asUser,
      'thread_ts': thread_ts,
      'attachments': [
        {
          'pretext': attachmentText,
          'text': attachmentSubText,
          'footer': attachmentFooterText,
        }
      ]
    };
    this.webClient.chat.postEphemeral(message).then(
      (resp: any) => {
        this.uBelt.logDebug(`Bot did sendEphemeralMessage: ${this.uBelt.pretty(message, 0)} w/resp: ${this.uBelt.pretty(resp, 0)}`);
      }).catch((err: any) => {
        this.uBelt.logError(`sendEphemeralMessage ${this.uBelt.pretty(err)}`);
      });
  }
  
  sendMessage(channel: string, user: string, text: string) {
    this.uBelt.logDebug(`sendMessage(${channel}, ${user}, ${text})`)
    this.rtmClient.sendMessage(text, channel).then(
      (resp: any) => {
        this.uBelt.logDebug(`Bot did sendMessage: "${text}" w/resp: ${this.uBelt.pretty(resp, 0)}`);
      }).catch((err: any) => {
        this.uBelt.logError(`sendMessage ${this.uBelt.pretty(err)}`);
      });
  }
  
  deleteMessage(channel: string, messageTs: number, asUser=false) {
    this.uBelt.logDebug(`deleteMessage(${channel}, ${messageTs})`)
    const message = {
      'channel': channel,
      'ts':messageTs,
      'as_user': asUser
    };
    this.webClient.chat.delete(message).then(
      (resp: any) => {
        this.uBelt.logDebug(`Bot did deleteMessage: ${this.uBelt.pretty(message, 0)} w/resp: ${this.uBelt.pretty(resp, 0)}`);
      }).catch((err: any) => {
        this.uBelt.logError(`deleteMessage ${this.uBelt.pretty(err)}`);
      });
  }

  getSlackInvisibleCharacter(): string {
    return String.fromCharCode(8206);
  }



}