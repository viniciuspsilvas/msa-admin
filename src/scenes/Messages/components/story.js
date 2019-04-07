import React from 'react'
import { storiesOf } from '@storybook/react'
import MessagesList from './MessagesList'

const list = [ 
  {
    "id" : 1, 
    "title": "Titulo Notification 1",
    "body": "Texto body corpo da mensagem asdad sdas dfgdfgdf wr dgcvvbdf ldgfgdln43 fgdfgdf 34",
    "createdAt": "",
    "sentAt": Date.now(),
    "isRead": true,
    "isDownloaded": true,
    "isArchived": false,
    "severity": "",
    "user" : {
      "fullname": "Glauco Martins Pereira"
    }
  },
  {
    "id" : 2, 
    "title": "Titulo Notification 2",
    "body": "Texto body corpo da mensagem asdad sdas dfgdfgdf wr dgcvvbdf ldgfgdln43 fgdfgdf 34",
    "createdAt": "",
    "sentAt": "",
    "isRead": false,
    "isDownloaded": true,
    "isArchived": false,
    "severity": "",
    "user" : {
      "fullname": "Glauco Martins Pereira"
    }
  },
  {
    "id" : 3, 
    "title": "Titulo Notification 3",
    "body": "Texto body corpo da mensagem asdad sdas dfgdfgdf wr dgcvvbdf ldgfgdln43 fgdfgdf 34",
    "createdAt": "",
    "sentAt": Date.now(),
    "isRead": true,
    "isDownloaded": true,
    "isArchived": false,
    "severity": "",
    "user" : {
      "fullname": "Glauco Martins Pereira"
    }
  },
  {
    "id" : 4, 
    "title": "Titulo Notification 4",
    "body": "Texto body corpo da mensagem asdad sdas dfgdfgdf wr dgcvvbdf ldgfgdln43 fgdfgdf 34",
    "createdAt": "",
    "sentAt": "",
    "isRead": false,
    "isDownloaded": true,
    "isArchived": false,
    "severity": "",
    "user" : {
      "fullname": "Glauco Martins Pereira"
    }
  }
];

storiesOf('MessagesList', module)
.add('default', () => <MessagesList list={list} handleSendNotif={ (msg) => window.alert(msg.id)} />)
.add('Empty', () => <MessagesList list={[]} />)

