import { marked } from 'marked'
import { useEffect, useState } from 'react'

interface MarkedProps {
  markup: string
}

export const Marked = ({ markup }: MarkedProps) => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (markup) {
      const parsed = marked.parse(markup)
      setContent(parsed)
    }
  }, [markup])

  return (
    <div
      style={{ paddingLeft: '30px' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
