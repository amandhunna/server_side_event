# Server-Side Event Trigger Demonstration

This is a demonstration for server-side event triggers over the frontend without using WebSockets. The application showcases how to use Server-Sent Events (SSE) to push real-time updates from the server to the client in a simple and efficient manner.

## What are Server-Sent Events (SSE)?

Server-Sent Events (SSE) allow a server to push real-time updates to the client over an HTTP connection. Unlike WebSockets, which allow bi-directional communication, SSE provides a one-way channel from the server to the client.

## Benefits of SSE over WebSockets

| Feature                    | Server-Sent Events (SSE)                             | WebSockets                                    |
| -------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| **Simplicity**             | Easier to implement for unidirectional communication | More complex due to full-duplex communication |
| **HTTP/1.1 Support**       | Fully supported, works seamlessly with HTTP          | Requires a separate protocol layer            |
| **Automatic Reconnection** | Built-in support for automatic reconnection          | Requires manual implementation                |
| **Text-based Protocol**    | Uses text/event-stream, which is simpler             | Uses binary or text frames                    |
| **Event ID**               | Supports event IDs for easy message tracking         | No built-in mechanism for message IDs         |
| **Less Overhead**          | Lower overhead for server-to-client messaging        | Higher overhead due to handshake and framing  |
| **Network Compatibility**  | Works well with existing HTTP infrastructure         | May face issues with proxies/firewalls        |

## Getting Started

To run this demonstration, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/amandhunna/server_side_event.git
   ```
2. Add mongoURL in .env file under express/.env
3. Run `make run`
