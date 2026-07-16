import { create } from 'zustand'

type Notification = {
  id: string
  message: string
}

type NotificationState = {
  notifications: Notification[]
  push: (message: string) => void
  dismiss: (id: string) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  push: (message) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: crypto.randomUUID(), message },
      ],
    })),
  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
}))
