'use client'
import CountUp from 'react-countup'

export default function CountUpClient(props: { count: number }) {
  return (
    <CountUp end={props.count} />
  )

}