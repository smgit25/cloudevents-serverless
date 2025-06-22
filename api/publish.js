import { CloudEvent, HTTP } from 'cloudevents';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const event = new CloudEvent({
    type: 'com.example.message',
    source: '/api/publish',
    data: req.body,
  });

  const message = HTTP.structured(event);

  const subscriberUrl = process.env.SUBSCRIBER_URL;

  const response = await fetch(subscriberUrl, {
    method: 'POST',
    headers: message.headers,
    body: message.body,
  });

  const responseText = await response.text();

  res.status(200).json({ status: 'Event sent', responseText });
}
