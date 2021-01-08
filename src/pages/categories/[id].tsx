import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { Content } from '../../types/content'
import { Category } from '../../types/category'
import axios from '../../plugins/microcms'
import { NextSeo } from 'next-seo'
import Main from '../../components/main'

interface Props {
  category: Category
  contents: Content[]
}
const App: React.FC<Props> = (prop) => {
  return (
    <>
      <NextSeo title={process.env.NEXT_PUBLIC_APP_NAME} description="" />
      <Main bg="bg-contents">
        <div className="flex pt-7">
          <span className="mr-5 text-4xl">Category</span>
          <span className="text-4xl">{prop.category.name}</span>
        </div>
        <div className="flex flex-wrap justify-between justify-center pt-7">
          {prop.contents.map((item) => {
            return (
              <Link href={`/contents/${item.id}`} key={item.id}>
                <div className="card my-2 w-60 h-12 cursor-pointer">
                  <div className="card_wrapper container h-full">
                    <div className="card_inner flex">
                      <div className="emoji flex flex-row items-center justify-center mr-3 w-12 h-12 bg-white rounded-lg">
                        <div className="emoji_inner w-6 h-6 text-5xl">{item.emoji}</div>
                      </div>
                      <div className="flex-1">
                        <h1 className="break-all text-xl">{item.title}</h1>
                        <div className="category pt-1">
                          <div className="category_inner flex">
                            {item.categories.map((category) => {
                              return (
                                <div className="mr-1 pb-0.5 pl-1 pr-1 pt-0.5 bg-white rounded-lg" key={category.id}>
                                  <Link href={`/categories/${category.id}`} key={item.id}>
                                    {category.name}
                                  </Link>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('category')
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
  const responseContent = await axios.get(
    `content?fields=id,emoji,title,categories.id,categories.name&filters=categories[contains]${id}`
  )
  const contents = responseContent.data.contents

  const responseCategory = await axios.get(`category/${id}?fields=name`)
  const category = responseCategory.data
  return {
    props: {
      contents,
      category,
    },
  }
}

export default App
