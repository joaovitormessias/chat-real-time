const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const {createStore} = require('zustand/vanilla');
async function setup() {
  let listener;
  const axios = {};
  const socket = {on: (_event, handler) => {listener = handler;}, off() {}};
  const context = vm.createContext({});
  const dependencies = {
    zustand: {create: createStore},
    'react-hot-toast': {default: {error() {}}},
    '../lib/axios': {axiosInstance: axios},
    './useAuthStore': {useAuthStore: {getState: () => ({socket})}},
  };
  const module = new vm.SourceTextModule(fs.readFileSync(path.join(__dirname,'../src/store/useChatStore.jsx'),'utf8'), {context});
  await module.link(name => new vm.SyntheticModule(Object.keys(dependencies[name]), function() {
    for (const [key,value] of Object.entries(dependencies[name])) this.setExport(key,value);
  }, {context}));
  await module.evaluate();
  return {store: module.namespace.useChatStore, axios, receive: message => listener(message)};
}
test('only the selected sender enters the visible conversation', async () => {
  const {store, receive} = await setup();
  store.getState().setSelectedUser({_id:'A'});
  store.getState().subscribeToMessages();
  receive({senderId:'B',text:'wrong conversation'});
  assert.equal(store.getState().messages.length,0);
  receive({senderId:'A',text:'expected'});
  assert.equal(store.getState().messages.length,1);
});
test('sending preserves incoming messages received while HTTP is pending', async () => {
  const {store, axios, receive} = await setup();
  let finish;
  axios.post = () => new Promise(resolve => {finish=resolve;});
  store.getState().setSelectedUser({_id:'A'});
  store.getState().subscribeToMessages();
  const pending=store.getState().sendMessage({text:'outgoing'});
  receive({senderId:'A',text:'incoming'});
  finish({data:{text:'outgoing'}});
  await pending;
  assert.equal(store.getState().messages.length,2);
});
test('late history and send responses do not enter a newly selected chat', async () => {
  const {store, axios} = await setup();
  let finishHistory, finishSend;
  axios.get = () => new Promise(resolve => {finishHistory=resolve;});
  axios.post = () => new Promise(resolve => {finishSend=resolve;});
  store.getState().setSelectedUser({_id:'A'});
  const history=store.getState().getMessages('A');
  const sent=store.getState().sendMessage({text:'old chat'});
  store.getState().setSelectedUser({_id:'B'});
  finishHistory({data:[{text:'old history'}]});
  finishSend({data:{text:'old chat'}});
  await Promise.all([history,sent]);
  assert.equal(store.getState().messages.length,0);
});
