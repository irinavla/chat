import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
    
    username: string = '';
    message: string = '';
    _chatSubscription;
    messages: object[] = [];

  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController, 
     public navParams: NavParams) {
        this.username = this.navParams.get('username');
        this._chatSubscription = this.db.list('/chat').valueChanges().subscribe( data => {
            this.messages = data;
      });
        //this.message = this.navParams.get('message');
  }
//    sendMessage() {
//    this.db.list('/chat').push({
//          username: this.username,
//          message: this.message
//      }).then( () => {
//        // message is sent   
//    }).catch( () => {
//        // message is not sent, an error has occured
//    })
//        this.message = '';
//    }
    
    sendMessage() {
    this.db.list('/chat').push({
          username: this.username,
          message: this.message
      }).then( () => {
        // message is sent   
    });
        this.message = '';
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
      this.db.list('/chat').push({
          specialMessage: true,
          message: `${this.username} has joined the chatroom`
      });
  }
    
ionViewWillLeave() {
    this._chatSubscription.unsubscribe();
    this.db.list('/chat').push({
          specialMessage: true,
          message: `${this.username} has left the chatroom`
      });
}

}
