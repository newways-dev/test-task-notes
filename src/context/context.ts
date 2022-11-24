import { Dispatch, SetStateAction, createContext } from 'react'
import { NoteType } from '../types/note'

interface IAppContext {
  edit: boolean
  setEdit: Dispatch<SetStateAction<boolean>>
  activeNote: NoteType | null
  setActiveNote: Dispatch<SetStateAction<NoteType | null>>
}

export const AppContext = createContext<IAppContext | null>(null)
