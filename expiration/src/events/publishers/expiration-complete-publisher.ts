import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@fatickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
