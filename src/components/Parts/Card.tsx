import Text from '@/components/DarkMode/Text'
import dayjs from '@/plugins/dayjs'
import { Content } from '@/types/microcms'
import Link from 'next/link'
import emoji from 'node-emoji/lib/emoji.json'
import React from 'react'

interface Props {
  content: Content
}

const App: React.FC<Props> = (props) => {
  const createdAt = Number(dayjs(props.content.createdAt).format('YYYYMMDD'))
  const emojiArr = Object.entries(emoji).map(([key, emoji]) => ({ key: key, emoji: emoji }))
  const num = createdAt % emojiArr.length
  return (
    <>
      <Link href={`/contents/${props.content.id}`} key={props.content.id}>
        <div className="card h-24 cursor-pointer">
          <div className="card_inner flex">
            <div className="emoji flex flex-row items-center justify-center mr-6 w-24 h-24 bg-white rounded-lg">
              <div className="emoji_inner w-12 h-12 text-5xl">{emojiArr[num].emoji}</div>
            </div>
            <div className="text flex-1">
              <Text>
                <h1 className="break-all text-lg font-bold md:text-xl">{props.content.title}</h1>
              </Text>
              <div className="tag pt-1">
                <div className="tag_inner flex">
                  {props.content.tags.map((tag) => {
                    return (
                      <div className="mr-2 p-0 text-href" key={tag.id}>
                        <Link href={`/tags/${tag.id}`} key={props.content.id}>
                          {`#${tag.name}`}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
export default App
