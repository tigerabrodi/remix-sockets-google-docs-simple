import * as React from 'react'
import { colors } from '~/theme'

export const Textarea: React.FC<{
  text: string
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}> = ({ text, handleChange }) => (
  <>
    <label
      htmlFor="text"
      style={{
        fontSize: 25,
        marginTop: 20,
        color: colors.pink,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 500,
      }}
    >
      Text
    </label>
    <textarea
      name="text"
      id="text"
      value={text}
      onChange={handleChange}
      style={{
        width: '80vw',
        maxWidth: 800,
        height: 900,
        marginTop: 30,
        color: colors.orange,
        backgroundColor: colors.brown,
        fontSize: 20,
        padding: 20,
        border: `2px solid ${colors.pink}`,
      }}
    ></textarea>
  </>
)
