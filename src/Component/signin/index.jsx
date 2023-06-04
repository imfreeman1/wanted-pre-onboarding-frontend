import React from 'react'
import Input from '../Input'
import Button from '../Button'

const Signin = () => {
  return (
    <div>
      <Input placeholder='email'/>
      <Input placeholder='password' />
      <Button children={'회원가입'} />
    </div>
  )
}

export default Signin