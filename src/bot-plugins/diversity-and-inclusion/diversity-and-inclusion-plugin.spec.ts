import "jasmine";
import { DiversityAndInclusionPlugin } from './diversity-and-inclusion-plugin';


describe("Diversity and Inclusion Plugin", () => {
  
  const plugin = new DiversityAndInclusionPlugin();

  it("should NOT trigger keyword detection", () => {
    expect(plugin.getKeywordFinder().isKeywordPresent(null)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(` `)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(` Gallon `)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hello gentle`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`guy fieri`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`yes sir`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`yes maam`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`yes ma'am`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hey girl`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hey guy`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hey man`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`guy`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`girl`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`man`)).toBeFalsy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`gal`)).toBeFalsy();
  });

  it("should trigger keyword detection", () => {
    expect(plugin.getKeywordFinder().isKeywordPresent(` Gals `)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`Gal's`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hey girl's, who knows Rob?`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hey girls, who knows Rob?`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hey guys, who knows Rob?`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hello gentlemen`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`hello gentleman`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`sam wasn't very ladylike today`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word retard is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word idiot is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word moron is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word dwarf is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word midget is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word midgets is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word midget's is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word miget is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word migets is not kind`)).toBeTruthy();
    expect(plugin.getKeywordFinder().isKeywordPresent(`saying the word dwarves is not kind`)).toBeTruthy();
  });

});

