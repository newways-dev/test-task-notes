import { Dispatch, SetStateAction, createContext } from 'react'
import { NoteType } from '../types/note'

interface IAppContext {
  edit: boolean
  setEdit: Dispatch<SetStateAction<boolean>>
  activeNote: NoteType
  setActiveNote: Dispatch<SetStateAction<NoteType>>
}

export const AppContext = createContext<IAppContext | null>(null)
