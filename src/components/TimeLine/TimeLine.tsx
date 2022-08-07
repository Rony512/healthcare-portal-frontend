import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface Object {
  _id:string;
  patientId:string;
  createdAt: string;
  patientName: string;
}

interface TimeLine {
  data: Object[]
}

export default function OppositeContentTimeline({ data }: TimeLine) {

  const style = {
    link: {
      textDecoration: 'none'
    }
  }

  interface Props {
    patientId:string;
    _id:string
    left: string;
    right: string;
  }

  const RenderItem = ({ left, right, patientId, _id }: Props) => {
    return (
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <Link style={style.link} to={`/requests/${_id}`}>{left}</Link>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color='primary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Link style={style.link} to={`/patients/${patientId}`}>{right}</Link>
        </TimelineContent>
      </TimelineItem >
    )
  }

  return (
    <>
      <Timeline position="left">
        {data.map((value, index) => {
          return (
            <RenderItem 
              key={index} 
              _id={value._id}
              patientId={value.patientId}
              left={moment(value.createdAt).format('llll')} 
              right={value.patientName}
              
              />
          )
        }).splice(0,8)}
      </Timeline>
    </>
  );
}
