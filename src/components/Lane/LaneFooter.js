import React from 'react'

import {LaneFooter} from '../../styles/Base'

import {CollapseBtn, ExpandBtn} from '../../styles/Elements'

const LaneFooterComponent = ({onClick, collapsed}) => (
  <LaneFooter onClick={onClick}>{collapsed ? <ExpandBtn /> : <CollapseBtn />}</LaneFooter>
)

export default LaneFooterComponent