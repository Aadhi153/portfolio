import { motion } from 'framer-motion'
import './CodeWindow.css'

const lines = [
  { tokens: [{ t: 'kw', v: 'const' }, { t: 'plain', v: ' ' }, { t: 'var', v: 'developer' }, { t: 'plain', v: ' = ' }, { t: 'punc', v: '{' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'name' }, { t: 'punc', v: ': ' }, { t: 'str', v: "'Aadhi Piranav'" }, { t: 'punc', v: ',' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'role' }, { t: 'punc', v: ': ' }, { t: 'str', v: "'Full Stack Developer'" }, { t: 'punc', v: ',' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'stack' }, { t: 'punc', v: ': ' }, { t: 'punc', v: '[' }, { t: 'str', v: "'React'" }, { t: 'punc', v: ', ' }, { t: 'str', v: "'Node.js'" }, { t: 'punc', v: ']' }, { t: 'punc', v: ',' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'location' }, { t: 'punc', v: ': ' }, { t: 'str', v: "'Tamil Nadu, India'" }, { t: 'punc', v: ',' }] },
  { indent: 1, tokens: [{ t: 'prop', v: 'available' }, { t: 'punc', v: ': ' }, { t: 'kw', v: 'true' }] },
  { tokens: [{ t: 'punc', v: '};' }] },
]

export default function CodeWindow() {
  return (
    <div className="code-window">
      <div className="code-window__titlebar">
        <div className="code-window__dots">
          <span className="code-window__dot code-window__dot--red" />
          <span className="code-window__dot code-window__dot--yellow" />
          <span className="code-window__dot code-window__dot--green" />
        </div>
        <span className="code-window__filename">developer.js</span>
      </div>

      <div className="code-window__body">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="code-window__line"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.09 }}
          >
            <span className="code-window__line-number">{i + 1}</span>
            <span className="code-window__code">
              {'  '.repeat(line.indent || 0)}
              {line.tokens.map((tok, j) => (
                <span key={j} className={`tok tok--${tok.t}`}>{tok.v}</span>
              ))}
            </span>
          </motion.div>
        ))}
        <span className="code-window__cursor" />
      </div>
    </div>
  )
}
