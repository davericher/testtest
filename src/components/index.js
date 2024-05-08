import LaneHeaderComponent from './Lane/LaneHeader'
import LaneFooterComponent from './Lane/LaneFooter'
import Card from './Card'
import Loader from './Loader'
import NewLaneForm from './NewLaneForm'
import NewCardForm from './NewCardForm'
import AddCardLink from './AddCardLink'
import NewLaneSection from './NewLaneSection'
import {BoardWrapper, GlobalStyle, ScrollableLane, Section} from '../styles/Base'

export default {
  GlobalStyle,
  BoardWrapper,
  Loader,
  ScrollableLane,
  LaneHeader: LaneHeaderComponent,
  LaneFooter: LaneFooterComponent,
  Section,
  NewLaneForm,
  NewLaneSection,
  NewCardForm,
  Card,
  AddCardLink
}
