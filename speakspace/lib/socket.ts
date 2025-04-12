import { io } from "socket.io-client"

// This would be replaced with your actual server URL in production
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

export const connectSocket = (userId: string, sessionId: string) => {
  if (!socket.connected) {
    socket.auth = { userId, sessionId }
    socket.connect()
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}

// Socket event listeners
export const onMessage = (callback: (message: any) => void) => {
  socket.on("message", callback)
  return () => {
    socket.off("message", callback)
  }
}

export const onUserJoin = (callback: (user: any) => void) => {
  socket.on("user:join", callback)
  return () => {
    socket.off("user:join", callback)
  }
}

export const onUserLeave = (callback: (userId: string) => void) => {
  socket.on("user:leave", callback)
  return () => {
    socket.off("user:leave", callback)
  }
}

export const onSpeakingTime = (callback: (data: any) => void) => {
  socket.on("speaking:time", callback)
  return () => {
    socket.off("speaking:time", callback)
  }
}

// Socket event emitters
export const sendMessage = (message: any) => {
  socket.emit("message", message)
}

export const joinSession = (sessionId: string) => {
  socket.emit("session:join", { sessionId })
}

export const leaveSession = (sessionId: string) => {
  socket.emit("session:leave", { sessionId })
}

export const startSpeaking = () => {
  socket.emit("speaking:start")
}

export const stopSpeaking = () => {
  socket.emit("speaking:stop")
}
