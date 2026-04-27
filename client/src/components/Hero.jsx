import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import './Hero.css'

const asciiArt = [
  ' .-""-.   .-""-.   .-""-.   .-""-.   .-""-.   .-""-.   .-""-.',
  '/      \\ /      \\ /      \\ /      \\ /      \\ /      \\ /      \\',
  '|  /\\  | |  /\\  | |  /\\  | |  /\\  | |  /\\  | |  /\\  | |  /\\  |',
  '| /  \\ | | /  \\ | | /  \\ | | /  \\ | | /  \\ | | /  \\ | | /  \\ |',
  '|/ /\\ \\| |/ /\\ \\| |/ /\\ \\| |/ /\\ \\| |/ /\\ \\| |/ /\\ \\|',
  '|/____\\| |/____\\| |/____\\| |/____\\| |/____\\| |/____\\| |/____\\|',
  '\\                                                              /',
  ' \\  *  soft   quiet   editorial   minimal   structure   calm  /',
  '  `-._                                                  _.-\'',
  '        `-._                                    _.-\'',
  '              `-._                      _.-\'',
  '                    `-._          _.-\'',
  '                         `-.__.-\'',
].join('\n')

const Hero = ({ onBrowse }) => {
  return (
    <section className="hero-container">
      <pre className="hero-ascii" aria-hidden="true">
        {asciiArt}
      </pre>

      <div className="hero-content container">
      
        <h1 className="hero-heading">
          changing the <span className="accent">world</span>
          <br />
          one <span className="italic">word</span>
          <br />
          at a time
        </h1>
        <Button className="hero-cta" onClick={onBrowse}>
          <span>View Blogs</span>
          <div className="cta-icon">
            <ArrowUpRight size={16} />
          </div>
        </Button>
      </div>
    </section>
  )
}

export default Hero
