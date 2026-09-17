const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {HISTORY,QUESTION_BANK}=require('./content.js');
const {buildQuizDeck}=require('./engine.js');
function seeded(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
test('priority runs always preserve the announced 10 + 3 + 2 structure and every supplied topic',()=>{
  for(let seed=0;seed<100;seed++){
    const deck=buildQuizDeck(QUESTION_BANK,false,seeded(seed));
    assert.equal(deck.length,15);assert.equal(new Set(deck.map(q=>q.id)).size,15);
    const rows=deck.map(item=>QUESTION_BANK.find(q=>q.id===item.id));
    assert.equal(rows.filter(q=>q.group==='priority').length,10);
    assert.equal(rows.filter(q=>q.group==='term').length,3);
    assert.equal(rows.filter(q=>q.group==='hobbes').length,1);
    assert.equal(rows.filter(q=>q.group==='locke').length,1);
    assert.ok(rows.some(q=>q.id==='t2'),'Salutary neglect must appear');
    for(const topic of ['bacon','pennsylvania','bill-rights','overview','albany','pitt','quebec','colonies-1763','debt','legacy'])assert.ok(rows.some(q=>q.topic===topic),topic);
    for(const item of deck)assert.deepEqual([...item.options].sort(),[0,1,2,3]);
  }
});
test('whole-chapter runs cover all five sections and keep the 15-question structure',()=>{
  for(let seed=0;seed<30;seed++){
    const deck=buildQuizDeck(QUESTION_BANK,true,seeded(seed));assert.equal(deck.length,15);
    const rows=deck.map(item=>QUESTION_BANK.find(q=>q.id===item.id));
    for(const section of ['4.1','4.2','4.3','4.4','4.5'])assert.equal(rows.filter(q=>q.group==='chapter'&&q.section===section).length,2);
  }
});
test('every answer is valid and every question has four distinct choices and an explanation',()=>{
  assert.equal(new Set(QUESTION_BANK.map(q=>q.id)).size,QUESTION_BANK.length);
  for(const q of QUESTION_BANK){assert.equal(q.a.length,4,q.id);assert.equal(new Set(q.a).size,4,q.id);assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4,q.id);assert.ok(q.why.length>20,q.id);}
});
test('packaged art and the complete key-term reference are available',()=>{
  for(const name of ['harbor','printshop','frontier'])assert.ok(fs.existsSync(path.join(__dirname,name+'.webp')));
  assert.ok(HISTORY.glossary.length>=12);assert.equal(HISTORY.priorities.length,12);
});
