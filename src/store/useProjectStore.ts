import { create } from "zustand"
import { toast } from "react-hot-toast"

interface ProjectItem {
  id: string | number
  slug: string
  name: string
  image: string
  price: number
}

interface ProjectStore {
  items: ProjectItem[]
  isOpen: boolean
  addItem: (item: ProjectItem) => void
  removeItem: (itemId: string | number) => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  setIsOpen: (isOpen: boolean) => void
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) => {
    const { items } = get()
    const existing = items.find((i) => i.id === item.id)
    if (existing) {
      toast.error("Item already in project")
      return
    }
    set({ items: [...items, item] })
    toast.success("Added to project")
  },
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }))
    toast.success("Removed from project")
  },
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  setIsOpen: (isOpen) => set({ isOpen }),
}))
