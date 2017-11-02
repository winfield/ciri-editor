import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import Menu from './Menu'
import Button from './Button'
import Icon from './Icon'

const plus = 'M20 12h-7V5h-1v7H5v1h7v7h1v-7h7'

const Tooltip = styled.div`
  position: absolute;
  top: -100px;
  margin-left: -18px;
  margin-top: -6px;
  padding: 0;
  width: ${props => props.isScaled ? 200 : 40}px;
  height: 40px;
  z-index: 400;
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  opacity: ${props => props.isActive ? 1 : 0};
`

const PlusButton = Button.extend`
  transition: transform .2s ease-out;

  ${ props => props.isScaled && css`
    transform: rotate(45deg);
  `};
`

class InlineTooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isScaled: false
    }
  }

  onPlusButtonClick = () => {
    this.setState(prevState => ({
      isScaled: !prevState.isScaled
    }))
  }

  render() {
    const { inlineTooltipRef, isActive } = this.props
    const { isScaled } = this.state

    return (
      <Tooltip
        innerRef={inlineTooltipRef}
        isActive={isActive}
        isScaled={isScaled}
      >
        <PlusButton 
          onClick={this.onPlusButtonClick}
          isScaled={isScaled}
        >
          <Icon path={plus} />
        </PlusButton>
        <Menu isScaled={isScaled} />
      </Tooltip>
    )
  }
}

export const updateInlineTooltipPosition = (inlineTooltip, editorState) => {
  if (!inlineTooltip) return

  const selection = window.getSelection()
  if (selection.type === 'None') return

  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  inlineTooltip.style.opacity = 1
  inlineTooltip.style.top = `${rect.top + window.scrollY}px`
  inlineTooltip.style.left = `${rect.left + window.scrollX - 40}px`
}

export default InlineTooltip
