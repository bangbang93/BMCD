/**
 * Created by bangbang93 on 2017/3/12.
 */
'use strict';
import Vue from 'vue'
import * as io from 'socket.io-client'

export default function ({namespace, events}, vue) {
  const socket = io.connect(namespace);
  events.forEach((event)=>{
    socket.on(event, (data)=>{
      vue.$emit(event, data);
    });
  });
  vue.$on('destroyed', ()=>{
    socket.disconnect();
  })
}