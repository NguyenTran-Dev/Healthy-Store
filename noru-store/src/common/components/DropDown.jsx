import React from 'react'
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const DropDown = () => {
  return (
    <UncontrolledDropdown group>
      <Button color="success">Sort by</Button>
      <DropdownToggle caret color="success" />
      <DropdownMenu>
        <DropdownItem>Name(a-Z)</DropdownItem>
        <DropdownItem>Price(low-high)</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default DropDown
