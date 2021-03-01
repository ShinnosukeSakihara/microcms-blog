import Text from 'components/DarkMode/Text'
import Main from 'components/Layout/Main'
import Card from 'components/Parts/Card'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { getContent, getContents } from 'plugins/microcms'
import React from 'react'
import { Content, Tag } from 'types/microcms'

interface Props {
  tag: Tag
  contents: Content[]
}

const App: React.FC<Props> = (props) => {
  return (
    <>
      <NextSeo
        title={`Tag ${props.tag.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`}
        description={`Tag ${props.tag.name}`}
      />
      <Main class="px-2 bg-top">
        <Text className="flex pt-14">
          <span className="mr-4 text-3xl md:text-4xl">Tag</span>
          <span className="break-all text-3xl md:text-4xl">{props.tag.name}</span>
        </Text>
        <div className="flex flex-wrap justify-between pt-14">
          {props.contents.map((content) => {
            return (
              <div className="my-5 w-full md:w-5/12" key={content.id}>
                <Card content={content}></Card>
              </div>
            )
          })}
        </div>
      </Main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const limit = 10000
  const response = await getContents<Tag>('tag', {
    fields: 'id',
    limit,
  })
  const paths = response.data.contents.map((params) => ({
    params,
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id
  const responseContent = await getContents<Content>('content', {
    fields: 'id,title,createdAt,tags.id,tags.name',
    filters: `tags[contains]${id}`,
  })
  const contents = responseContent.data.contents

  const responseTag = await getContent<Tag>(`tag/${id}`, {
    fields: 'name',
  })
  const tag = responseTag.data
  return {
    props: {
      contents,
      tag,
    },
  }
}

export default App
