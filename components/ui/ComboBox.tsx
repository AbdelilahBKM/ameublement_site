"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComboboxProps, Country } from "@/types/Contries";

export function Combobox({ value, onChange, regions }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: Country[]) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    let filtered: { value: string; label: string }[] = [];

    if (regions.length === 0) {
      // If regions array is empty, include all countries
      filtered = countries.map((country) => ({
        value: country.translations.fra?.common || country.name.common, // Use label as value
        label: country.translations.fra?.common || country.name.common,
      }));
    } else {
      // Filter countries based on regions
      filtered = countries
        .filter(
          (country) =>
            regions.includes(country.region) ||
            (regions.includes("North Africa") && country.subregion === "Northern Africa") ||
            (regions.includes("Middle East") && country.subregion === "Western Asia") ||
            (regions.includes("North America") &&
              country.region === "Americas" &&
              ["Northern America", "Caribbean"].includes(country.subregion))
        )
        .map((country) => ({
          value: country.translations.fra?.common || country.name.common, // Use label as value
          label: country.translations.fra?.common || country.name.common,
        }));
    }
    
    setFilteredCountries(filtered);
  }, [countries, regions]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? filteredCountries.find((country) => country.value === value)?.label
            : "Sélectionnez un pays..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher un pays..." />
          <CommandList>
            <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
