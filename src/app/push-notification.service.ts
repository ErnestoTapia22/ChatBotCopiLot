import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private readonly VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY';

  constructor(private swPush: SwPush, private http: HttpClient) { }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        // Send subscription to the server
        this.http.post('/api/subscribe', sub).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
