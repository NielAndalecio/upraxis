import { Button } from 'antd'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

function Password({ text }) {
  const [showPassword, setShowPassword] = useState(false)
  const passwordText = showPassword ? text : '*'.repeat(text.length)

  return (
    <div>
      <Button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <AiFillEyeInvisible color="#386648" />
        ) : (
          <AiFillEye color="#386648" />
        )}
      </Button>
      <span style={{ margin: '16px' }}>{passwordText}</span>
    </div>
  )
}

export default Password
