// Interfaces extendidas para el sistema de chat moderno
export interface ContactInterface {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  lastSeen: Date;
  isOnline: boolean;
  isTyping?: boolean; // Nuevo campo para estado de escritura
}

export interface ChatRoomInterface {
  id: string;
  type: "general" | "private";
  name?: string; // Para chat general
  participants: string[]; // UIDs de participantes
  lastMessage?: {
    text: string;
    timestamp: Date;
    senderUid: string;
    senderName: string;
  };
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  typingUsers?: string[]; // UIDs de usuarios escribiendo
}

export interface ExtendedMessageInterface {
  id: string;
  chatRoomId: string;
  userName: string;
  userUID: string;
  userPhotoUrl: string;
  text: string;
  createdAt: Date;
  messageType: "text" | "image" | "file";
  status: "sent" | "delivered" | "read";
}

// Nuevas interfaces para funcionalidades adicionales
export interface TypingIndicatorInterface {
  chatRoomId: string;
  userUID: string;
  userName: string;
  timestamp: Date;
}

export interface ChatNotificationInterface {
  id: string;
  type: "message" | "user_join" | "user_leave";
  chatRoomId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
