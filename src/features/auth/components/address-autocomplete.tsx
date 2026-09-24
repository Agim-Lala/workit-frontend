import { useQuery } from '@tanstack/react-query'
import { LocateFixed, MapPin } from 'lucide-react'
import { useEffect, useId, useState, type InputHTMLAttributes, type KeyboardEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useT } from '@/i18n'
import { getApiError } from '@/lib/api-error'
import { cn } from '@/lib/utils'

import {
  autocompleteAddress,
  minAddressQueryLength,
  reverseGeocode,
  type AddressSuggestion,
} from '../api/geocoding'

const debounceMs = 300

type AddressAutocompleteProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'onSelect'
> & {
  value: string
  /** Free typing; the previously picked location no longer applies. */
  onValueChange: (value: string) => void
  /** A suggestion or the user's current location was picked. */
  onSelect: (suggestion: AddressSuggestion) => void
}

export function AddressAutocomplete({
  value,
  onValueChange,
  onSelect,
  onBlur,
  className,
  ...inputProps
}: AddressAutocompleteProps) {
  const t = useT()
  const listboxId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [locateState, setLocateState] = useState<'idle' | 'locating' | 'error'>('idle')
  const [locateError, setLocateError] = useState<string | null>(null)
  const query = useDebouncedValue(value.trim(), debounceMs)

  const suggestionsQuery = useQuery({
    queryKey: ['geocoding', 'autocomplete', query],
    queryFn: ({ signal }) => autocompleteAddress(query, signal),
    enabled: isOpen && query.length >= minAddressQueryLength,
    staleTime: 5 * 60 * 1000,
  })
  const suggestions = suggestionsQuery.data ?? []
  const showList = isOpen && query.length >= minAddressQueryLength && (suggestionsQuery.isFetched || suggestions.length > 0)

  function select(suggestion: AddressSuggestion) {
    onSelect(suggestion)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!showList || suggestions.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      select(suggestions[activeIndex])
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  function locateCurrentPosition() {
    if (!('geolocation' in navigator)) {
      setLocateState('error')
      setLocateError(t('address.locate.unsupported'))
      return
    }

    setLocateState('locating')
    setLocateError(null)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          select(await reverseGeocode(position.coords.latitude, position.coords.longitude))
          setLocateState('idle')
        } catch (error) {
          setLocateState('error')
          setLocateError(getApiError(error)?.detail ?? t('address.locate.notFound'))
        }
      },
      () => {
        setLocateState('error')
        setLocateError(t('address.locate.denied'))
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  }

  return (
    <div>
      <div className="relative mt-2">
        <MapPin
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          {...inputProps}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={showList}
          autoComplete="off"
          className={cn('pl-10', className)}
          onBlur={(event) => {
            setIsOpen(false)
            onBlur?.(event)
          }}
          onChange={(event) => {
            onValueChange(event.target.value)
            setIsOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          value={value}
        />

        {showList ? (
          <ul
            className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto border-2 border-foreground bg-surface shadow-lg"
            id={listboxId}
            role="listbox"
          >
            {suggestions.length === 0 ? (
              <li className="px-3.5 py-3 text-sm text-muted-foreground">{t('address.noResults')}</li>
            ) : (
              suggestions.map((suggestion, index) => (
                <li
                  aria-selected={index === activeIndex}
                  className={cn(
                    'flex cursor-pointer items-start gap-2 px-3.5 py-3 text-sm text-foreground',
                    index === activeIndex ? 'bg-peach' : 'hover:bg-secondary',
                  )}
                  id={`${listboxId}-${index}`}
                  key={suggestion.address}
                  // Keep focus on the input so onBlur doesn't close the list before the click lands.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => select(suggestion)}
                  role="option"
                >
                  <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={16} />
                  {suggestion.address}
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Button
          disabled={locateState === 'locating'}
          onClick={locateCurrentPosition}
          size="sm"
          type="button"
          variant="ghost"
        >
          <LocateFixed aria-hidden="true" size={16} />
          {locateState === 'locating' ? t('address.locate.locating') : t('address.locate.button')}
        </Button>
        {locateError ? (
          <p className="text-xs text-destructive" role="alert">{locateError}</p>
        ) : null}
      </div>
    </div>
  )
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}
