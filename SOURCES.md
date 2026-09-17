# Historical sources and editorial notes

## Primary classroom material

The user supplied an edited Word document titled **Chapter 4 Rule Britannia**, derived from [OpenStax, U.S. History, Chapter 4](https://openstax.org/books/us-history/pages/4-introduction). The game paraphrases concepts and does not distribute the attachment or reproduce its full text.

OpenStax attribution: P. Scott Corbett, Volker Janssen, John M. Lund, Todd Pfannestiel, Sylvie Waskiewicz, and Paul Vickery, *U.S. History*, OpenStax, Rice University. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The original material has been shortened, adapted into fictional scenes, and supplemented as described below.

The twelve bold chapter key terms extracted from that file were Restoration colonies, proprietary colonies, Navigation Acts, salutary neglect, Dominion of New England, Glorious Revolution, nonconformist, First Great Awakening, Enlightenment, Freemasons, deism, and French and Indian War. The glossary lists them first.

## Class-priority supplements

The user additionally identified Bacon’s Rebellion’s legacy, Pennsylvania, the English Bill of Rights, Hobbesian and Lockean government, salutary neglect, an overview, the Albany Plan, Pitt, Quebec, the colonies in 1763, British debt, and legacies of the war as likely quiz topics.

- **Bacon’s Rebellion:** [OpenStax §3.3, English Settlements in America](https://openstax.org/books/us-history/pages/3-3-english-settlements-in-america); [National Park Service, Bacon’s Rebellion](https://www.nps.gov/jame/learn/historyculture/bacons-rebellion.htm). The game explains its contribution to a longer change in labor and racial hierarchy. It does not claim that slavery began in 1676 or that the rebellion alone caused the transition. Native people were targets of the rebellion, not merely scenery.
- **Albany Plan:** [Office of the Historian, Albany Plan of Union, 1754](https://history.state.gov/milestones/1750-1775/albany-plan); [National Archives, The Albany Plan of Union](https://founders.archives.gov/documents/Franklin/01-05-02-0104). Congress adoption is distinguished from implementation. The proposed union remained within the British Empire and was not a declaration of independence.
- **Quebec:** [National Defense University Press, Wolfe, Montcalm, and the Principles of Joint Operations in the Quebec Campaign of 1759](https://ndupress.ndu.edu/Media/News/News-Article-View/Article/2019421/wolfe-montcalm-and-the-principles-of-joint-operations-in-the-quebec-campaign-of/). The game distinguishes Quebec in 1759, Montreal in 1760, and the peace treaty in 1763.
- **War and imperial consequences:** [Office of the Historian, French and Indian War / Seven Years’ War, 1754–63](https://history.state.gov/milestones/1750-1775/french-indian-war). Territorial victory, debt, frontier disputes, and later attempts to increase revenue are connected without suggesting independence happened in 1763.
- **Hobbes:** [Thomas Hobbes, *Leviathan*, in The English Works, vol. III](https://www.gutenberg.org/files/73957/73957-h/73957-h.htm), especially chapters XIII–XVIII. The game emphasizes insecurity without common power, a social contract, and sovereign authority. It does not reduce Hobbes’s sovereign to a necessarily hereditary monarch or claim that self-preservation can simply be surrendered.
- **Locke:** [John Locke, *Second Treatise of Government*](https://www.gutenberg.org/cache/epub/7370/pg7370-images.html), especially chapters II, IX, and XIX. The game emphasizes consent, natural rights, limited authority, and resistance when government betrays its trust. The attachment dates *Two Treatises* to 1690, which the game retains; it appeared in late 1689 with a 1690 title-page date.

The Office of the Historian’s Milestones series carries a notice that it is retired and no longer maintained. It is used here for historical background, not current policy.

## Editorial choices

- Playable characters, combat encounters, dialogue, maps, and resources are fictional scenarios. Musket reload times are shortened for play. The courier mission takes place after Andros’s April 1689 overthrow and the English Bill of Rights of December 1689; its loyalist patrols are fictional. The Hobbes/Locke comparison is an explanatory summary; Locke’s Two Treatises appeared in late 1689 with a 1690 title-page date.
- Generated scenery is atmospheric and reused across places and dates. It should not be treated as a historically precise view of Philadelphia, Charles Town, or a particular fort.
- The supplied excerpt gives the Royal African Company monopoly’s end as 1689; many standard accounts instead use 1698. The game avoids testing that disputed date and does not repeat it as a fact.
- The supplied excerpt’s description of the 1663 Staple Act and some 1763 overseas territorial transfers is compressed. The game uses broad trade restrictions and the major mainland settlement, avoiding those imprecise details.
- The chapter’s shortened North American date range for the War of Jenkins’ Ear is labeled as coming from the edited chapter; the broader war is often dated differently.
- The Jamestown mission puts the player in the role of a civilian escaping violence. It does not reward attacks on Native peoples or participation in enslavement.
- Naval patrols and combat dramatize evasion; this is not a claim that every smuggler faced a naval battle. The defense mission compresses 1754–1758 into one encounter so that Pitt’s resources change the player’s available options.
- Debt, unrest, supply, troop counts, scores, and timers are game values. They are not historical statistics.
- Practice questions are original and should not be presented as the teacher’s actual quiz.

## Artwork

Three original menu environments were generated with the built-in OpenAI ImageGen tool, then converted from PNG to WebP. Exact prompts are included in [ART-PROMPTS.json](ART-PROMPTS.json). Files: `harbor.webp`, `printshop.webp`, and `frontier.webp`. Gameplay worlds are original procedural Three.js and Canvas geometry. Three.js 0.169.0 is bundled from its official npm distribution under the included MIT license.

## Voice production

The game uses prerecorded synthetic dialogue generated locally with [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (Apache 2.0) through [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) (MIT). Eight stock voices portray fictional characters; they are not historical recordings or imitations of named performers. Original scripts, voice assignments, speaking rates, clip durations, and filenames are in `voice-lines.mjs`. See [VOICE-CREDITS.md](VOICE-CREDITS.md). No model or speech-generation library runs in the player's browser.

## Privacy and persistence

Story progress and best quiz score are stored only in `localStorage` in the player’s browser. There are no accounts, telemetry, remote saves, or AI calls. Google Fonts is the only optional external display dependency. All gameplay and images are local static assets.
