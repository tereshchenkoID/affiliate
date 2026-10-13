'use client'

import { useState } from 'react'

import { DatePicker, DateRange } from '@/components/Form/DatePicker'
import Box from '@/components/Layout/Box'

const Section = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date()
  })

  const handleRangeChange = (newRange: DateRange) => {
    setDateRange(newRange)
  }

  return (
    <Box
      as="section"
      display="grid"
      gap="4"
    >
      Dashboard
      <DatePicker
        value={dateRange}
        onChange={handleRangeChange}
      />
    </Box>
  )
}

export default Section
