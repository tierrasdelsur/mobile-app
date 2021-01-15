import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { delayWhen, flatMap, retry, retryWhen } from 'rxjs/operators';
import { TokenFirebase } from '../dominio/token-firebase';
import { TokenFirebaseRepository } from '../repositorios/token-firebase.repository';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  ngOnDestroy(): void {
    for (const key in this.subs) {
      if (this.subs[key]) {
        this.subs[key].unsubscribe();
      }
    }
  }

  private token: string;
  private tokenFirebase: TokenFirebase;
  currentMessage = new BehaviorSubject(null);

  private subs: { [key: string]: Subscription } = {};

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private tokenFirebaseRepository: TokenFirebaseRepository
    ) {
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(token) {
    // we can change this function to request our backend service
    this.token = token;
    this.tokenFirebase = new TokenFirebase();
    this.tokenFirebase.token = token;

    this.tokenFirebaseRepository.save(this.tokenFirebase).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen(val => timer(10 * 1000)),
          retry(1)
        )
      )
      ).subscribe({
      next: () => {
        console.log('Dispositivo vinculado');
      },
      error: (error) => {
        console.error('Error en la registracion del token', error);
      }
    });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }

  deleteToken() {
    this.angularFireMessaging.deleteToken(this.token).pipe(
      retryWhen(errors =>
        errors.pipe(
          delayWhen(val => timer(10 * 1000)),
          retry(1)
        )
      )
    ).subscribe({
      next: () => {
        console.log('Codigo desactivado')
      }
    });
  }
}
