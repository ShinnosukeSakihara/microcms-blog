import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DarkModeBtn from 'components/Button/DarkMode'
import Link from 'components/DarkMode/Link'
import React from 'react'

const App: React.FC = () => {
  return (
    <>
      <header className="dark:bg-gray-900">
        <div className="header container mx-auto px-1 h-16">
          <div className="header_inner flex items-center justify-between h-full dark:text-white">
            <Link href="/" className="header_title text-2xl font-bold cursor-pointer">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
            <div className="link flex items-center justify-between w-24 h-full cursor-pointer">
              <div className="twitter">
                <a href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <div className="github">
                <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
              <div>
                <DarkModeBtn></DarkModeBtn>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default App
