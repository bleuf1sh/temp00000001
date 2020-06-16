import { UtilityBelt } from "../../components/utility-belt";
import { BasicSlackbotPlugin, BasicSlackbot, IncomingSlackMessage } from "../../components/basic-slackbot/basic-slackbot";
import { KeywordFinder } from "../../components/keyword-finder/keyword-finder";
import * as diversityAndInclusionKeywords from './diversity-and-inclusion-keywords.json'


export class DiversityAndInclusionPlugin implements BasicSlackbotPlugin {
  private uBelt = new UtilityBelt('DiversityAndInclusionPlugin');
  private dAndIKeywordFinder = new KeywordFinder(diversityAndInclusionKeywords);

  getKeywords(): string {
    return this.uBelt.pretty(this.dAndIKeywordFinder.getRegexKeywordList());
  }

  getKeywordFinder(): KeywordFinder {
    return this.dAndIKeywordFinder;
  }

  handleIncomingMessage(slackbot: BasicSlackbot, message: IncomingSlackMessage): void {
    if (slackbot.isMessageFromABot(message)) return;
    
    if (slackbot.isMessageFromUs(message)) return;
    
    if (!this.dAndIKeywordFinder.isKeywordPresent(message.text)) return;

    this.uBelt.logInfo(`Channel:${message.channel}| ${message.user} sent: ${message.text}`);

    const genderInclusiveSheetLink = `http://qmunity.ca/wp-content/uploads/2015/12/Gender-Inclusivity-Sheet_PNG-socialmediaDO-NOT-SHARE-ON-QWALL-YET.png`;
    const wordFlowChartLink = `https://open.buffer.com/wp-content/uploads/2017/06/what-should-you-call.png`;
    const inclusiveLanguageLink = `https://open.buffer.com/inclusive-language-tech/`;
    const feedbackFormLink = 'https://goo.gl/forms/Nqzd0hKpTI9czL8h1';
    const likeUsLink = `https://docs.google.com/forms/d/e/1FAIpQLSdvJUu7GprSfs2BMuDqR5rWKRna6limfPqLT-84VjEmHS228A/viewform?usp=pp_url&entry.1964031136=Thumbs+Up+👍`;


    const attachmentText = `Howdy <@${message.user}>, I'm a bot from _<https://pivotal.io/careers/diversity|D&I @Pivotal>_`;
    const attachmenntSubText: string = [
      `${slackbot.getSlackInvisibleCharacter()}`,
      `💡 We encourage using inclusive language when possible.`,
      `${slackbot.getSlackInvisibleCharacter()}`,
      `<${feedbackFormLink}|📬 Send> us your thoughts or <${likeUsLink}|a 👍?>`,
    ].join('\n');
    const attachmentFooterText = `Do the right thing. Do what works. Be Kind.`;

    slackbot.sendEphemeralMessage(
      message.channel, 
      message.user, 
      attachmentText, 
      attachmenntSubText, 
      attachmentFooterText, 
      false, 
      message.thread_ts
    );
  }

}