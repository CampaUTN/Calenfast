import Link from 'next/link'
import Layout from '../components/Layout'
import Input from '../components/Input'
import ResultsList from '../components/ResultsList'
import MeetDurationSelect from '../components/MeetDurationSelect';

  const positions = [
  {
    id: 1,
    time: '14:00',
    date: 'January 7, 2020',
  },
  {
    id: 2,
    time: '16:00',
    date: 'January 7, 2020',
  },
  {
    id: 3,
    time: '17:30',
    date: 'January 14, 2020',
  },
]

const ResultsPage = () => {
  return(
    <Layout title="Possible Meetings">
      <Input/>
      <MeetDurationSelect></MeetDurationSelect>
      <ResultsList positions={positions}/>
    </Layout>
  )
}
  


export default ResultsPage
