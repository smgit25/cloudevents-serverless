import { HTTP } from 'cloudevents';

export default async function handler(req, res) {
  try {
    const event = HTTP.toEvent({ headers: req.headers, body: req.body });
    console.log('🔔 CloudEvent received:', event.type, event.data);

    res.status(200).send('Event received successfully');
  } catch (err) {
    console.error(' Invalid CloudEvent:', err);
    res.status(400).send('Bad Request');
  }
}
