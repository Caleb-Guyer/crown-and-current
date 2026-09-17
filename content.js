'use strict';
// Adapted study reference and original practice questions; see SOURCES.md.
const HISTORY = {
  "glossary": [
    [
      "Restoration colonies",
      "New York, New Jersey, Pennsylvania, and the Carolinas, established or acquired under Charles II after 1660."
    ],
    [
      "proprietary colonies",
      "Colonies granted by a monarch to an individual, family, or group."
    ],
    [
      "Navigation Acts",
      "English laws restricting colonial shipping and trade to benefit the empire."
    ],
    [
      "salutary neglect",
      "Loose enforcement of imperial trade rules that allowed colonial commerce substantial freedom."
    ],
    [
      "Dominion of New England",
      "James II’s centralized colonial government, created in 1686 and governed by Edmund Andros."
    ],
    [
      "Glorious Revolution",
      "The 1688–1689 overthrow of James II and accession of William and Mary, strengthening Parliament."
    ],
    [
      "nonconformist",
      "A Protestant who did not conform to the established Church of England. The 1689 Toleration Act protected some such groups."
    ],
    [
      "First Great Awakening",
      "An eighteenth-century Protestant revival stressing emotional, personal religious experience."
    ],
    [
      "Enlightenment",
      "The Age of Reason: inquiry, reason, observation, and challenges to inherited authority."
    ],
    [
      "Freemasons",
      "A fraternal society associated with Enlightenment inquiry and tolerance."
    ],
    [
      "deism",
      "Belief in a creator who does not continually intervene in the world after creation."
    ],
    [
      "French and Indian War",
      "The 1754–1763 North American conflict between Britain and France and their respective allies; part of a wider global war."
    ],
    [
      "Quakers",
      "The Society of Friends; emphasized an inner light in each person and rejected inherited social rank."
    ],
    [
      "mercantilism",
      "An economic approach using colonies and controlled trade to strengthen the mother country."
    ],
    [
      "consumer revolution",
      "Growth in the purchase and display of consumer goods, linking colonists with Britain."
    ],
    [
      "gentry",
      "A wealthy colonial elite that displayed refinement and emulated the English aristocracy."
    ],
    [
      "Middle Passage",
      "The forced Atlantic transport of enslaved Africans to the Americas."
    ],
    [
      "Stono Rebellion",
      "A 1739 uprising of enslaved people in South Carolina led by Jemmy."
    ],
    [
      "New Lights / Old Lights",
      "Supporters / opponents of the religious revivalism of the Great Awakening."
    ],
    [
      "rationalism",
      "The view that reason is a means of gaining knowledge."
    ],
    [
      "empiricism",
      "The view that observation and experience are sources of knowledge."
    ],
    [
      "progressivism",
      "In this chapter: belief in human progress through reason and observation, not the later American political movement."
    ],
    [
      "cosmopolitanism",
      "Seeing oneself as a citizen of a wider world rather than thinking only in local terms."
    ],
    [
      "Hobbes",
      "Leviathan (1651): insecurity and conflict without common authority support a strong sovereign and social contract. Supplemental to the attachment."
    ],
    [
      "Locke",
      "Two Treatises (1690): consent, natural rights to life, liberty, and property, limited government, and resistance to a government that betrays its trust."
    ],
    [
      "social contract",
      "An account of political authority arising from people’s agreement; Hobbes and Locke disagree about its implications."
    ],
    [
      "habeas corpus",
      "The requirement to bring an imprisoned person before a court to justify detention."
    ],
    [
      "Albany Plan of Union",
      "Franklin’s 1754 proposal for joint colonial defense and government within the British Empire. Adopted by the congress but never implemented."
    ],
    [
      "Bacon’s Rebellion",
      "A 1676 Virginia revolt involving conflict over land, Native peoples, labor, and elite power. Its aftermath helped intensify racial slavery and divisions among laborers."
    ]
  ],
  "timeline": [
    [
      "1642–1649",
      "English Civil War; Charles I is executed in 1649."
    ],
    [
      "1660",
      "Restoration of Charles II."
    ],
    [
      "1664",
      "England takes New Netherland; it becomes New York."
    ],
    [
      "1681",
      "Penn receives Pennsylvania."
    ],
    [
      "1686",
      "Dominion of New England created."
    ],
    [
      "1688–1689",
      "Glorious Revolution. William and Mary take the throne in 1689."
    ],
    [
      "1689",
      "English Bill of Rights and Toleration Act."
    ],
    [
      "1707",
      "England and Scotland unite as Great Britain."
    ],
    [
      "1715–1718",
      "Yamasee War: Native resistance to traders’ abuses and encroaching settlement; Cherokee alliance helps the English."
    ],
    [
      "1732–1733",
      "Georgia chartered, then settled under James Oglethorpe."
    ],
    [
      "1733",
      "Molasses Act."
    ],
    [
      "1739–1740",
      "Stono Rebellion, then South Carolina’s restrictive new slave code."
    ],
    [
      "1754",
      "French and Indian War begins in North America."
    ],
    [
      "1758",
      "British fortunes turn under Pitt."
    ],
    [
      "1759–1760",
      "Quebec and Montreal fall."
    ],
    [
      "1763",
      "Treaty of Paris ends the war; Britain is victorious and deeply indebted."
    ]
  ],
  "wars": [
    [
      "King William’s War",
      "1688–1697",
      "War of the League of Augsburg; inconclusive in America."
    ],
    [
      "Queen Anne’s War",
      "1702–1713",
      "War of Spanish Succession; France loses Acadia and Newfoundland, but Britain fails to take Quebec."
    ],
    [
      "War of Jenkins’ Ear",
      "1739–1742 in the edited chapter",
      "Britain and Spain; Georgia and trade are disputed. Georgia remains a British buffer against Spanish Florida."
    ],
    [
      "King George’s War",
      "1744–1748",
      "War of Austrian Succession; Britain takes Louisbourg, then returns it in the peace settlement."
    ],
    [
      "French and Indian War",
      "1754–1763",
      "Seven Years’ War (1756–1763 in Europe); decisive British victory."
    ]
  ],
  "priorities": [
    [
      "Overview: a stronger empire, stronger ties",
      "From the Restoration to 1763, Britain’s empire expands. Trade, goods, war, Protestant religion, and ideas connect many colonists to Britain. This growth depends on dispossession and coerced labor as well as migration. Colonists do not begin this chapter as people already seeking independence."
    ],
    [
      "Legacy of Bacon’s Rebellion",
      "Virginia, 1676: an uprising against Berkeley exposes class tensions and attacks Native peoples. Fear of alliances among poor White and Black laborers helps encourage elite reliance on enslaved African labor and sharper racial divisions. Slavery predates the rebellion; it is a catalyst, not its sole cause."
    ],
    [
      "Pennsylvania",
      "Charles II grants Pennsylvania to William Penn in 1681. Penn is a Quaker. The colony has no official established church and attracts migrants seeking religious tolerance. Friends emphasize an inner light and reject inherited rank, yet slavery and other inequalities persist."
    ],
    [
      "English Bill of Rights · 1689",
      "After the Glorious Revolution, William and Mary rule within a constitutional monarchy. Parliament gains stronger protections, including free speech in Parliament, regular elections, and control over taxation. Remember: a limited monarchy, not the end of monarchy or universal democracy."
    ],
    [
      "A Hobbesian government",
      "People escaping insecurity and conflict authorize a strong sovereign to keep peace. Order and security justify broad sovereign power. Hobbes’s state of nature is insecure; his social contract is not a defense of routine rebellion. A sovereign can be one ruler or an assembly."
    ],
    [
      "A Lockean government",
      "Government depends on consent and protects natural rights: life, liberty, and property. Its power is limited by its purpose. A government that seriously violates its trust can be resisted and replaced. Both Locke and Hobbes use a social contract; they disagree about what authority it supports."
    ],
    [
      "Salutary neglect",
      "Trade laws still exist, but enforcement is loose. Merchants develop habits of autonomy and sometimes smuggle. Later efforts to enforce rules and raise revenue feel like a disruption of established practice."
    ],
    [
      "Albany Plan · 1754",
      "Franklin proposes union for shared defense and Native relations, with a crown-appointed executive and colonial grand council. The congress adopts it, but colonies resist losing power and Britain does not implement it. It anticipates later cooperation while remaining loyal to the empire."
    ],
    [
      "Turning point · William Pitt",
      "Pitt commits British money, resources, and recruitment support. From 1758, Britain’s fortunes improve. The empire’s ability to fund and sustain war helps make victory possible—and increases its financial burden."
    ],
    [
      "Victory at Quebec · 1759",
      "Wolfe’s British forces defeat Montcalm’s French forces on the Plains of Abraham. Both commanders are fatally wounded. Quebec falls in 1759 and Montreal in 1760; the peace treaty follows in 1763. Do not confuse the battle date with the treaty date."
    ],
    [
      "The colonies in 1763",
      "Britain gains Canada, French territory east of the Mississippi except New Orleans, and Florida. Many colonists celebrate being British. With the French mainland threat reduced, western land becomes a new point of conflict; Native nations retain their own claims and interests."
    ],
    [
      "British debt and the war’s legacy",
      "An expensive victory creates debt and new defense costs. Britain seeks colonial revenue and tighter administration. Colonists accustomed to autonomy resist. Less French danger, wartime experience, and disputes over taxes and expansion help set the conditions for revolution; independence is not declared in 1763."
    ]
  ]
};
const QUESTION_BANK = [
  {
    "id": "c1",
    "group": "chapter",
    "section": "4.1",
    "q": "A colonist celebrates the Restoration in 1660. What has returned?",
    "a": [
      "The English monarchy under Charles II",
      "Dutch rule in New York",
      "Catholic rule under James II",
      "The Dominion of New England"
    ],
    "correct": 0,
    "why": "The Restoration brought Charles II to the throne after the interregnum."
  },
  {
    "id": "c2",
    "group": "chapter",
    "section": "4.1",
    "q": "Why did Pennsylvania especially attract Quaker families?",
    "a": [
      "It required everyone to join the Church of England",
      "It offered unusual religious tolerance and no established official church",
      "It was founded by Oliver Cromwell",
      "It was a Spanish mission colony"
    ],
    "correct": 1,
    "why": "William Penn was a Quaker; Pennsylvania offered religious toleration and had no established church."
  },
  {
    "id": "c3",
    "group": "chapter",
    "section": "4.1",
    "q": "Which earlier colony most directly shaped plantation slavery in southern Carolina?",
    "a": [
      "Massachusetts",
      "New Netherland",
      "Barbados",
      "Rhode Island"
    ],
    "correct": 2,
    "why": "Migrants from Barbados brought plantation practices and slave codes to Carolina."
  },
  {
    "id": "c4",
    "group": "chapter",
    "section": "4.1",
    "q": "Which group did England take New Netherland from in 1664?",
    "a": [
      "The French",
      "The Spanish",
      "The Portuguese",
      "The Dutch"
    ],
    "correct": 3,
    "why": "England seized the Dutch colony and renamed it New York for the Duke of York."
  },
  {
    "id": "c5",
    "group": "chapter",
    "section": "4.1",
    "q": "Why did the Yamasee War break out?",
    "a": [
      "Native peoples resisted traders’ abuses and expanding English settlement",
      "Quakers demanded a state church",
      "Parliament repealed every Navigation Act",
      "France surrendered Canada"
    ],
    "correct": 0,
    "why": "Abusive trade and English expansion onto Native land prompted a coalition’s resistance."
  },
  {
    "id": "c6",
    "group": "chapter",
    "section": "4.1",
    "q": "A merchant secretly imports cheap French molasses in the 1730s. Which condition helps explain this?",
    "a": [
      "France owns Boston",
      "British enforcement is lax",
      "The Molasses Act requires French imports",
      "All customs duties have been abolished"
    ],
    "correct": 1,
    "why": "Salutary neglect made smuggling common despite the Molasses Act’s duties."
  },
  {
    "id": "c7",
    "group": "chapter",
    "section": "4.2",
    "q": "Who replaced James II after the Glorious Revolution?",
    "a": [
      "Charles I and Henrietta Maria",
      "Oliver and Richard Cromwell",
      "William and Mary",
      "George III and Queen Anne"
    ],
    "correct": 2,
    "why": "William of Orange and Mary took the throne in 1689."
  },
  {
    "id": "c8",
    "group": "chapter",
    "section": "4.2",
    "q": "What happened to Edmund Andros in Boston in 1689?",
    "a": [
      "He founded Pennsylvania",
      "He took command of New France",
      "He became king",
      "Colonists overthrew his government and jailed him"
    ],
    "correct": 3,
    "why": "The colonial impact of the Glorious Revolution included the overthrow of the Dominion government."
  },
  {
    "id": "c9",
    "group": "chapter",
    "section": "4.2",
    "q": "What political arrangement followed the English Bill of Rights in 1689?",
    "a": [
      "A constitutional monarchy with stronger parliamentary rights",
      "A monarchy free of parliamentary limits",
      "A republic with no monarch",
      "French control of Parliament"
    ],
    "correct": 0,
    "why": "Royal power was limited; Parliament’s independence and rights were strengthened."
  },
  {
    "id": "c10",
    "group": "chapter",
    "section": "4.2",
    "q": "What is an important limit of the 1689 Toleration Act?",
    "a": [
      "It outlawed Baptists",
      "It did not extend toleration to Catholics",
      "It ended the Church of England",
      "It imposed universal religious equality"
    ],
    "correct": 1,
    "why": "The act protected some nonconformist Protestants, not Catholics."
  },
  {
    "id": "c11",
    "group": "chapter",
    "section": "4.3",
    "q": "Which statement best describes slavery in British mainland North America?",
    "a": [
      "It existed only in Georgia",
      "It ended after the Glorious Revolution",
      "It existed in every colony",
      "It was limited to the West Indies"
    ],
    "correct": 2,
    "why": "The chapter stresses that slavery existed throughout the colonies, including northern ports."
  },
  {
    "id": "c12",
    "group": "chapter",
    "section": "4.3",
    "q": "How did South Carolina’s government respond to the Stono Rebellion?",
    "a": [
      "It immediately abolished slavery",
      "It granted universal voting rights",
      "It ended plantation agriculture",
      "It imposed new restrictions through the Negro Act of 1740"
    ],
    "correct": 3,
    "why": "The 1740 law restricted assembly, movement, writing, and other aspects of enslaved people’s lives."
  },
  {
    "id": "c13",
    "group": "chapter",
    "section": "4.3",
    "q": "What did the consumer revolution do to the relationship between colonists and Britain?",
    "a": [
      "Strengthened ties through purchases of British goods",
      "Ended colonial interest in British fashions",
      "Stopped transatlantic trade",
      "Abolished the colonial gentry"
    ],
    "correct": 0,
    "why": "Imported consumer goods connected ordinary colonists and the gentry to Britain."
  },
  {
    "id": "c14",
    "group": "chapter",
    "section": "4.3",
    "q": "What did Cato’s Letters urge readers to do?",
    "a": [
      "Reject all printed debate",
      "Remain vigilant against threats to liberty",
      "Restore French rule in Canada",
      "End all religious worship"
    ],
    "correct": 1,
    "why": "Trenchard and Gordon warned readers that liberty faced continual threats."
  },
  {
    "id": "c15",
    "group": "chapter",
    "section": "4.3",
    "q": "What did the Spectator encourage among its readers?",
    "a": [
      "Military conquest of Spain",
      "Ending all trade",
      "Refined taste, manners, and behavior",
      "A return to the Dutch patroonship system"
    ],
    "correct": 2,
    "why": "The Spectator’s essays sought to cultivate genteel conduct and taste."
  },
  {
    "id": "c16",
    "group": "chapter",
    "section": "4.4",
    "q": "A traveling minister draws emotional crowds in 1739–1740. Who best fits this description?",
    "a": [
      "William Pitt",
      "James Oglethorpe",
      "Edmund Andros",
      "George Whitefield"
    ],
    "correct": 3,
    "why": "Whitefield was the famous itinerant evangelist of the Great Awakening."
  },
  {
    "id": "c17",
    "group": "chapter",
    "section": "4.4",
    "q": "Which distinction best separates the Great Awakening and the Enlightenment?",
    "a": [
      "Emotional personal faith versus reason and investigation",
      "French trade versus Dutch trade",
      "Republicanism versus monarchy in every case",
      "Both rejected any new ideas"
    ],
    "correct": 0,
    "why": "The Great Awakening emphasized revival and felt faith; the Enlightenment emphasized reason and inquiry."
  },
  {
    "id": "c18",
    "group": "chapter",
    "section": "4.4",
    "q": "Why did Britain support the founding of Georgia?",
    "a": [
      "To return Carolina to Spain",
      "To create a buffer against Spanish Florida as well as a reform colony",
      "To replace Pennsylvania as a Quaker colony",
      "To settle a debt to William Penn"
    ],
    "correct": 1,
    "why": "Oglethorpe’s reform vision coincided with Britain’s strategic interest in a buffer colony."
  },
  {
    "id": "c19",
    "group": "chapter",
    "section": "4.4",
    "q": "Who wrote the sermon “Sinners in the Hands of an Angry God”?",
    "a": [
      "Benjamin Franklin",
      "John Locke",
      "Jonathan Edwards",
      "William Penn"
    ],
    "correct": 2,
    "why": "Edwards used vivid descriptions of damnation to stir religious emotion."
  },
  {
    "id": "c20",
    "group": "chapter",
    "section": "4.4",
    "q": "Which action best illustrates empiricism?",
    "a": [
      "Accepting a claim solely because of inherited rank",
      "Refusing to compare evidence",
      "Buying fashionable tea sets",
      "Learning from observation and experience"
    ],
    "correct": 3,
    "why": "Empiricism treats experience and observation as sources of knowledge."
  },
  {
    "id": "c21",
    "group": "chapter",
    "section": "4.5",
    "q": "What sparked the French and Indian War in North America?",
    "a": [
      "Rival French and British claims in the Ohio country",
      "The Stamp Act in Boston",
      "The Boston Tea Party",
      "The execution of Charles I"
    ],
    "correct": 0,
    "why": "Rival claims in the Ohio Valley led to clashes involving Washington in 1754."
  },
  {
    "id": "c22",
    "group": "chapter",
    "section": "4.5",
    "q": "What helped turn the war in Britain’s favor in 1758?",
    "a": [
      "France voluntarily abandoned all forts",
      "William Pitt’s commitment of money and resources",
      "The end of the British navy",
      "Washington’s victory at Fort Necessity"
    ],
    "correct": 1,
    "why": "Pitt devoted major funds and resources; Britain also benefited from new Native agreements."
  },
  {
    "id": "c23",
    "group": "chapter",
    "section": "4.5",
    "q": "Which consequence of Britain’s 1763 victory helped create later imperial tension?",
    "a": [
      "Immediate colonial independence",
      "The disappearance of British military spending",
      "Heavy war debt and efforts to make colonies help pay",
      "Dutch annexation of Virginia"
    ],
    "correct": 2,
    "why": "War debt led to imperial reforms that later strained Britain’s relationship with the colonies."
  },
  {
    "id": "c24",
    "group": "chapter",
    "section": "4.5",
    "q": "How did many British colonists initially react to the victory over France?",
    "a": [
      "They declared independence that same day",
      "They asked France to rule them",
      "They rejected their British identity",
      "They celebrated their identity as British subjects"
    ],
    "correct": 3,
    "why": "Victory initially reinforced colonial pride in belonging to the British Empire."
  },
  {
    "id": "c25",
    "group": "chapter",
    "section": "4.5",
    "q": "What happened to Louisbourg after King George’s War?",
    "a": [
      "Britain returned it to France under the peace treaty",
      "It became the capital of Georgia",
      "Spain took it from Virginia",
      "It became an independent republic"
    ],
    "correct": 0,
    "why": "Britain captured Louisbourg in 1745 but returned it in the Treaty of Aix-la-Chapelle."
  },
  {
    "id": "t1",
    "group": "term",
    "section": "4.1",
    "q": "A king grants a colony to a trusted individual or group. What is it called?",
    "a": [
      "A proprietary colony",
      "A nonconformist colony",
      "An itinerant colony",
      "A consumer republic"
    ],
    "correct": 0,
    "why": "Proprietary colonies were granted to proprietors: individuals, families, or groups."
  },
  {
    "id": "t2",
    "group": "term",
    "section": "4.1",
    "q": "What term describes Britain’s lax enforcement of colonial trade laws?",
    "a": [
      "Predestination",
      "Salutary neglect",
      "Deism",
      "The Restoration"
    ],
    "correct": 1,
    "why": "Salutary neglect is loose imperial enforcement, especially associated here with Walpole."
  },
  {
    "id": "t3",
    "group": "term",
    "section": "4.4",
    "q": "Which belief holds that a creator made the world but does not continually intervene?",
    "a": [
      "Mercantilism",
      "Patroonship",
      "Deism",
      "Revivalism"
    ],
    "correct": 2,
    "why": "Deism distinguishes a creator from a deity continually intervening in events."
  },
  {
    "id": "t4",
    "group": "term",
    "section": "4.2",
    "q": "What was the Dominion of New England?",
    "a": [
      "A French military alliance",
      "A Quaker congregation",
      "A consumer magazine",
      "James II’s centralized colonial government under Andros"
    ],
    "correct": 3,
    "why": "James II created the Dominion to centralize imperial control."
  },
  {
    "id": "t5",
    "group": "term",
    "section": "4.4",
    "q": "Which movement made reason and investigation central to knowledge?",
    "a": [
      "The Enlightenment",
      "The Restoration",
      "The Yamasee War",
      "The Middle Passage"
    ],
    "correct": 0,
    "why": "The Enlightenment is also known as the Age of Reason."
  },
  {
    "id": "t6",
    "group": "term",
    "section": "4.4",
    "q": "Who were the Freemasons in this chapter?",
    "a": [
      "Royal customs officers",
      "A fraternal society promoting inquiry and tolerance",
      "A French infantry regiment",
      "The founders of the Royal African Company"
    ],
    "correct": 1,
    "why": "Freemasonry promoted Enlightenment principles, including inquiry and tolerance."
  },
  {
    "id": "t7",
    "group": "term",
    "section": "4.2",
    "q": "In this chapter, a nonconformist was a Protestant who did not conform to what?",
    "a": [
      "The French monarchy",
      "The Ohio Company",
      "The established Church of England",
      "The Treaty of Paris"
    ],
    "correct": 2,
    "why": "Nonconformist Protestants stood outside the established Anglican church."
  },
  {
    "id": "t8",
    "group": "term",
    "section": "4.1",
    "q": "Which laws restricted colonial trade for the benefit of England?",
    "a": [
      "The Stono Codes",
      "The Two Treatises",
      "The Articles of Confederation",
      "The Navigation Acts"
    ],
    "correct": 3,
    "why": "The Navigation Acts regulated imperial shipping and commerce."
  },
  {
    "id": "t9",
    "group": "term",
    "section": "4.1",
    "q": "Which set consists of Restoration colonies?",
    "a": [
      "New York, New Jersey, Pennsylvania, and the Carolinas",
      "Georgia, Virginia, and Canada",
      "Massachusetts, Plymouth, and Quebec",
      "Florida, Louisiana, and New Spain"
    ],
    "correct": 0,
    "why": "These colonies were added or supported during Charles II’s reign."
  },
  {
    "id": "t10",
    "group": "term",
    "section": "4.4",
    "q": "What was the First Great Awakening?",
    "a": [
      "A British trade monopoly",
      "A Protestant revival emphasizing emotional personal faith",
      "A treaty between Britain and France",
      "The return of Charles II"
    ],
    "correct": 1,
    "why": "The First Great Awakening brought emotional revivalism across the British Atlantic."
  },
  {
    "id": "h1",
    "group": "hobbes",
    "section": "Supplement",
    "q": "Why did Hobbes defend a strong sovereign?",
    "a": [
      "To prevent the insecurity and conflict of life without common authority",
      "To guarantee a right to rebel over every disagreement",
      "To place every law under a church council",
      "To eliminate the social contract"
    ],
    "correct": 0,
    "why": "Hobbes’s Leviathan argues that a common sovereign authority can secure peace."
  },
  {
    "id": "h2",
    "group": "hobbes",
    "section": "Supplement",
    "q": "Which description best fits Hobbes’s state of nature?",
    "a": [
      "A peaceful world needing no common power",
      "A condition of insecurity and potential conflict without a common authority",
      "A British colony owned by Penn",
      "A constitutional monarchy already governed by Parliament"
    ],
    "correct": 1,
    "why": "Hobbes describes vulnerability and conflict when no common authority keeps people secure."
  },
  {
    "id": "h3",
    "group": "hobbes",
    "section": "Supplement",
    "q": "A council argues that people must authorize a powerful sovereign to prevent violent disorder. Whose argument does this most resemble?",
    "a": [
      "William Penn’s religious toleration",
      "The Albany Plan’s territorial claims",
      "Thomas Hobbes’s case for sovereign authority",
      "A rejection of all government"
    ],
    "correct": 2,
    "why": "Hobbes makes effective sovereign power the remedy for insecurity without common authority."
  },
  {
    "id": "l1",
    "group": "locke",
    "section": "4.2 + supplement",
    "q": "Which rights did Locke say government should protect?",
    "a": [
      "An absolute monarch’s unlimited commands",
      "Only hereditary titles",
      "The exclusive right of kings to tax",
      "Life, liberty, and property"
    ],
    "correct": 3,
    "why": "Locke grounds legitimate government in consent and the protection of natural rights."
  },
  {
    "id": "l2",
    "group": "locke",
    "section": "4.2 + supplement",
    "q": "According to Locke, what can people do when government seriously betrays its trust?",
    "a": [
      "Replace it with a government that protects their rights",
      "Never resist any ruler under any circumstances",
      "End all need for law forever",
      "Transfer all natural rights to a hereditary aristocracy"
    ],
    "correct": 0,
    "why": "Locke defends resistance and replacement when government violates its trust and purposes."
  },
  {
    "id": "l3",
    "group": "locke",
    "section": "4.2 + supplement",
    "q": "An assembly says that government needs consent and must protect natural rights or be replaced. Which model does this most resemble?",
    "a": [
      "Divine-right absolutism",
      "A Lockean government",
      "A government with no limits or accountability",
      "Rule based only on hereditary rank"
    ],
    "correct": 1,
    "why": "Locke links legitimate government to consent and the protection of natural rights, with resistance when its trust is seriously violated."
  },
  {
    "id": "t11",
    "group": "term",
    "section": "4.2",
    "q": "What was the Glorious Revolution?",
    "a": [
      "The overthrow of James II and accession of William and Mary in 1688–1689",
      "A colonial declaration of independence in 1763",
      "The return of Charles II in 1660",
      "The founding of Georgia in 1732"
    ],
    "correct": 0,
    "why": "The Glorious Revolution replaced James II, strengthened Parliament, and helped establish constitutional monarchy."
  },
  {
    "id": "t12",
    "group": "term",
    "section": "4.5",
    "q": "Which conflict is the North American part of the wider Seven Years’ War?",
    "a": [
      "Bacon’s Rebellion",
      "The French and Indian War",
      "The English Civil War",
      "The Yamasee War"
    ],
    "correct": 1,
    "why": "The French and Indian War began in North America in 1754; the European Seven Years’ War began in 1756."
  },
  {
    "id": "p1",
    "group": "priority",
    "topic": "bacon",
    "section": "Class supplement",
    "q": "Which development is associated with the legacy of Bacon’s Rebellion?",
    "a": [
      "Stronger racial divisions and growing elite reliance on enslaved African labor",
      "The invention of slavery in 1676",
      "Immediate independence for Virginia",
      "An end to conflict over Native land"
    ],
    "correct": 0,
    "why": "The rebellion exposed elite fears of labor alliances and helped accelerate an existing shift toward racial slavery; it was not the only cause."
  },
  {
    "id": "p2",
    "group": "priority",
    "topic": "pennsylvania",
    "section": "4.1",
    "q": "Your Quaker family wants a colony without an official established church. Which destination best fits?",
    "a": [
      "The Dominion under Andros",
      "Penn’s Pennsylvania",
      "Puritan Massachusetts",
      "French Quebec"
    ],
    "correct": 1,
    "why": "Pennsylvania attracted Quakers and other migrants through religious tolerance and no established official church."
  },
  {
    "id": "p3",
    "group": "priority",
    "topic": "bill-rights",
    "section": "4.2",
    "q": "A ruler accepts the English Bill of Rights in 1689. What changes?",
    "a": [
      "Parliament is permanently abolished",
      "Every adult receives the vote",
      "Royal power is limited and Parliament’s rights are strengthened",
      "England becomes a French province"
    ],
    "correct": 2,
    "why": "The Bill of Rights supports a constitutional monarchy and Parliament, rather than absolute royal power."
  },
  {
    "id": "p4",
    "group": "priority",
    "topic": "overview",
    "section": "4 overview",
    "q": "Which description best fits the relationship between many colonists and Britain before and immediately after the victory of 1763?",
    "a": [
      "They have already declared independence",
      "They have no commercial or cultural ties",
      "They unanimously want French rule",
      "They have strong imperial ties and often take pride in being British"
    ],
    "correct": 3,
    "why": "Trade, culture, religion, and military experience reinforced ties. Revolution grew out of later disputes, not a permanent absence of British identity."
  },
  {
    "id": "p5",
    "group": "priority",
    "topic": "albany",
    "section": "Class supplement",
    "q": "What was the purpose and result of the Albany Plan of 1754?",
    "a": [
      "A plan for colonial union within the empire that was never implemented",
      "A successful declaration of independence",
      "A treaty giving Canada to Britain",
      "A law banning colonial assemblies"
    ],
    "correct": 0,
    "why": "Franklin proposed a common government for shared concerns; fear of losing authority and British preferences kept it from being implemented."
  },
  {
    "id": "p6",
    "group": "priority",
    "topic": "pitt",
    "section": "4.5",
    "q": "Your army has suffered years of setbacks. Which change under William Pitt helps turn the war?",
    "a": [
      "Britain ends all military spending",
      "Britain commits major funds, supplies, and recruitment support",
      "France wins Quebec in 1759",
      "Britain abandons North America"
    ],
    "correct": 1,
    "why": "Pitt devoted resources on a major scale, helping Britain improve its position from 1758."
  },
  {
    "id": "p7",
    "group": "priority",
    "topic": "quebec",
    "section": "4.5 + supplement",
    "q": "Which sequence correctly connects Quebec with the end of the war?",
    "a": [
      "Treaty of Paris in 1754, then Quebec in 1763",
      "Quebec in 1763, then war begins in 1765",
      "British victory at Quebec in 1759, then the Treaty of Paris in 1763",
      "Quebec falls to Spain in 1689"
    ],
    "correct": 2,
    "why": "Wolfe’s forces defeated Montcalm’s in 1759. Montreal fell in 1760; the wider war ended in 1763."
  },
  {
    "id": "p8",
    "group": "priority",
    "topic": "colonies-1763",
    "section": "4.5 + supplement",
    "q": "What best describes Britain’s position in North America after the Treaty of Paris of 1763?",
    "a": [
      "Britain loses all its mainland colonies",
      "France keeps Canada and Britain leaves Florida",
      "The colonies immediately become independent",
      "Britain gains Canada and Florida and becomes the dominant European power on the mainland"
    ],
    "correct": 3,
    "why": "British territorial gains were enormous, though Spain retained other claims and Native nations still defended their homelands."
  },
  {
    "id": "p9",
    "group": "priority",
    "topic": "debt",
    "section": "4.5",
    "q": "Why did an expensive British victory foreshadow trouble with the colonies?",
    "a": [
      "Britain sought colonial revenue and tighter control to help meet debt and imperial costs",
      "The peace treaty canceled Britain’s debt",
      "The colonies had never traded with Britain",
      "British victory made taxes permanently unnecessary"
    ],
    "correct": 0,
    "why": "War costs encouraged imperial reforms that strained relations with colonists accustomed to autonomy."
  },
  {
    "id": "p10",
    "group": "priority",
    "topic": "legacy",
    "section": "Class supplement",
    "q": "Which is the strongest explanation of the war’s longer-term legacy?",
    "a": [
      "Victory removed every source of conflict",
      "Reduced French danger, new territory, debt, and imperial reforms helped create conditions for revolution",
      "Britain granted universal colonial independence in 1763",
      "The Albany Plan immediately became the US Constitution"
    ],
    "correct": 1,
    "why": "Victory created new disputes over money, authority, and western land. Revolution developed later; it was not an immediate treaty provision."
  }
];
if(typeof module !== 'undefined') module.exports={HISTORY,QUESTION_BANK};
