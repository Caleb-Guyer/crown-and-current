'use strict';
function shuffle(list, random = Math.random) {
  const result=[...list];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
function buildQuizDeck(bank, broad=false, random=Math.random) {
  const base=broad
    ? ['4.1','4.2','4.3','4.4','4.5'].flatMap(section=>shuffle(bank.filter(q=>q.group==='chapter'&&q.section===section),random).slice(0,2))
    : bank.filter(q=>q.group==='priority');
  const terms=bank.filter(q=>q.group==='term');
  // Salutary neglect is both a bold chapter term and an explicitly supplied class priority.
  const chosenTerms=broad?shuffle(terms,random).slice(0,3):[bank.find(q=>q.id==='t2'),...shuffle(terms.filter(q=>q.id!=='t2'),random).slice(0,2)];
  const take=group=>shuffle(bank.filter(q=>q.group===group),random)[0];
  return shuffle([...base,...chosenTerms,take('hobbes'),take('locke')],random).map(q=>({id:q.id,options:shuffle(q.a.map((_,i)=>i),random)}));
}
if(typeof module!=='undefined')module.exports={shuffle,buildQuizDeck};
