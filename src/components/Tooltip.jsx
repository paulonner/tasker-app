import { OverlayTrigger, Tooltip as BsTooltip } from 'react-bootstrap'

const Tooltip = ({ children, text }) => (
  <OverlayTrigger overlay={<BsTooltip>{text}</BsTooltip>} >
    {children}
  </OverlayTrigger>
)

export default Tooltip