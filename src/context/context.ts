import { Dispatch, SetStateAction, createContext } from 'react'
import { NoteType } from '../types/note'

interface IAppContext {
  edit: boolean
  setEdit: Dispatch<SetStateAction<boolean>>
  activeNote: NoteType | null
  setActiveNote: Dispatch<SetStateAction<NoteType | null>>
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<IAppContext | null>(null)
