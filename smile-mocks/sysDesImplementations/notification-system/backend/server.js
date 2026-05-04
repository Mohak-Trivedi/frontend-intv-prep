const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const notificationStore = new Map();
const sseClients = new Map();

function getUserNotifications(userId) {
  if (!notificationStore.has(userId)) {
    notificationStore.set(userId, []);
  }

  return notificationStore.get(userId);
}

function sendSSEEvent(res, eventType, payload) {
  res.write(`data: ${JSON.stringify({ type: eventType, payload })}\n\n`);
}

function pushNotificationToUser(userId, notification) {
  const client = sseClients.get(userId);

  if (client) {
    sendSSEEvent(client, 'NEW_NOTIFICATION', notification);
  }
}

app.get('/api/notifications/stream/:userId', (req, res) => {
  const { userId } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  sendSSEEvent(res, 'CONNECTED', { userId, message: 'SSE stream established' });

  sseClients.set(userId, res);
  console.log(`[SSE] Client connected: ${userId} | Active connections: ${sseClients.size}`);

  const heartBeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 30_000);

  req.on('close', () => {
    clearInterval(heartBeat);
    sseClients.delete(userId);
    console.log(`[SSE] Client disconnected: `);
  });
})

app.get('api/notifications/:userId', (req, res) => {
  const notifications = getUserNotifications(req.params.userId);
  res.json(notifications);
})

app.get('api/notifications/:userId/unread-count', (req, res) => {
  const notifications = getUserNotifications(req.params.userId);
  res.json({ count: notifications.filter(n => !n.isRead).length });
})

app.post('/api/notifications', (req, res) => {
  const { userId, title, description, type } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required' });
  }

  const VALID_TYPES = ['order_placed', 'order_shipped', 'payment_failed', 'refund_processed', 'info'];
  const notification = {
    id: uuidv4(),
    userId,
    title,
    description: description || '',
    type: VALID_TYPES.includes(type) ? type : 'info',
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  const list = getUserNotifications(userId);
  list.unshift(notification);

  pushNotificationToUser(userId, notification);

  res.status(201).json(notification);
})

app.patch('/api/notifications/:userId/:notificationId/read', (req, res) => {
  const { userId, notificationId } = req.params;
  const notifications = getUserNotifications(userId);
  const notification = notifications.find(n => n.id === notificationId);

  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }

  notification.isRead = true;
  res.json(notification);
})

app.patch('/api/notifications/:userId/read-all', (req, res) => {
  const notifications = getUserNotifications(req.params.userId);
  notifications.forEach(n => (n.isRead = true));
  res.json({ success: true, updated: notifications.length });
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});