import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import TitledCard from './index'

describe('<TitledCard />', () => {
  it('render TitledCard with dumi', () => {
    const msg = 'dumi'

    render(<TitledCard title={msg} />)
    expect(screen.queryByText(msg)).toBeInTheDocument()
  })
})
