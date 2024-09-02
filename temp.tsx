"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const countryCodes = [
  { code: '+1', country: 'US' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  { code: '+81', country: 'JP' },
  { code: '+86', country: 'CN' },
]

export default function Component() {
  const [countryCode, setCountryCode] = useState('+1')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '') // Remove non-digit characters
    setPhoneNumber(input)
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="flex">
        <Select value={countryCode} onValueChange={setCountryCode}>
          <SelectTrigger className="w-[110px] rounded-r-none">
            <SelectValue placeholder="Code" />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.country} ({country.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="phone"
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="rounded-l-none"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Selected phone: {countryCode} {phoneNumber}
      </p>
    </div>
  )
}