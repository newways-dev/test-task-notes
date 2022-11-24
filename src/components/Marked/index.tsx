import { marked } from 'marked'

interface MarkedProps {
  markup: string
}

export const Marked = ({ markup }: MarkedProps) => {
  const content = marked.parse(markup)

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
