import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const TEMP_CIRCLE_ID = 'temp-circle'
const ROUTE_SOURCE_ID = 'route-source'
const ROUTE_LAYER_ID = 'route-layer'

export default function RateCalculator({
  onNavigate,
}: {
  onNavigate: (s: string) => void
}) {
  const [pickupPos, setPickupPos] = useState<any>(null)
  const [dropPos, setDropPos] = useState<any>(null)
  const [pickupArea, setPickupArea] = useState('')
  const [dropArea, setDropArea] = useState('')

  const [weight, setWeight] = useState('')
  const [paymentMode, setPaymentMode] = useState('')
  const [result, setResult] = useState<any>(null)

  const [mapMode, setMapMode] = useState<'pickup' | 'drop' | null>(null)
  const [tempPos, setTempPos] = useState<any>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const [previewDistance, setPreviewDistance] = useState<number | null>(null)

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_API_KEY
  const API_KEY = import.meta.env.VITE_ORS_API_KEY

  // ---------------- REVERSE GEOCODING ----------------
  const getAddress = async (lat: number, lon: number) => {
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      )
      const data = await r.json()
      const a = data.address || {}
      const area =
        a.suburb || a.neighbourhood || a.village || a.town || a.hamlet
      const city = a.city || a.town || a.village || a.state_district
      if (area && city && area !== city) return `${area}, ${city}`
      if (area) return area
      if (city) return city
      return data.display_name
    } catch {
      return 'Unknown Area'
    }
  }

  // ---------------- GET ROUTE FROM ORS ----------------
  const getRouteGeo = async (start: any, end: any) => {
    try {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
      const res = await fetch(url)
      const data = await res.json()
      const f = data?.features?.[0]
      if (!f) return null
      const dist = f.properties?.segments?.[0]?.distance ?? null
      return { geo: f.geometry, distanceKm: dist ? dist / 1000 : null }
    } catch {
      return null
    }
  }

  // ---------------- PRICE CALC ----------------
  const calculatePrice = (distance: number, weight: number, mode: string) => {
    const base = 25
    const distFare = distance > 1 ? (distance - 1) * 6 : 0
    const w = weight > 1000 ? Math.ceil((weight - 1000) / 500) * 10 : 0
    const cod = mode === 'cod' ? 30 : 0
    return {
      baseFare: base,
      distanceFare: Math.round(distFare),
      weightFare: w,
      codFare: cod,
      total: Math.round(base + distFare + w + cod),
    }
  }

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e?: any) => {
    if (e?.preventDefault) e.preventDefault()

    if (!pickupPos || !dropPos) {
      return alert('Select pickup & drop first.')
    }

    const route = await getRouteGeo(pickupPos, dropPos)
    const d = route?.distanceKm ?? previewDistance ?? 0
    const fare = calculatePrice(d, Number(weight), paymentMode)

    setResult({
      pickupArea,
      dropArea,
      distance: d.toFixed(2),
      weight,
      paymentMode,
      ...fare,
    })
  }

  // ---------------- INITIALIZE MAP ----------------
  useEffect(() => {
    if (!mapMode) {
      if (mapRef.current) {
        try {
          mapRef.current.remove()
        } catch {}
        mapRef.current = null
        markerRef.current = null
      }
      setTempPos(null)
      setSearchQuery('')
      setSearchResults([])
      return
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center: [73.8567, 18.5204],
      zoom: 12,
    })

    mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    // Map Click
    mapRef.current.on('click', (ev: any) => {
      const { lng, lat } = ev.lngLat
      setTempPos({ lat, lng })

      if (markerRef.current) markerRef.current.remove()
      markerRef.current = new maplibregl.Marker({ color: '#0077ff' })
        .setLngLat([lng, lat])
        .addTo(mapRef.current)
    })

    return () => {
      try {
        mapRef.current?.remove()
      } catch {}
      mapRef.current = null
      markerRef.current = null
    }
  }, [mapMode])

  // ---------------- HYBRID SEARCH ----------------
  useEffect(() => {
    if (!mapMode || !searchQuery.trim()) {
      setSearchResults([])
      return
    }

    let cancelled = false
    setSearchLoading(true)

    const run = async () => {
      const q = encodeURIComponent(searchQuery.trim())
      const results: any[] = []

      // MapTiler
      if (MAPTILER_KEY) {
        try {
          const url = `https://api.maptiler.com/geocoding/${q}.json?key=${MAPTILER_KEY}&country=IN&limit=6`
          const r = await fetch(url)
          const data = await r.json()
          data.features?.forEach((f: any) =>
            results.push({
              display_name: f.properties.label,
              lat: f.geometry.coordinates[1],
              lon: f.geometry.coordinates[0],
            })
          )
        } catch {}
      }

      // Nominatim fallback
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=6&addressdetails=1&countrycodes=in`
        const r2 = await fetch(url)
        const d2 = await r2.json()
        d2?.forEach((n: any) =>
          results.push({
            display_name: n.display_name,
            lat: parseFloat(n.lat),
            lon: parseFloat(n.lon),
          })
        )
      } catch {}

      if (cancelled) return

      // Dedupe by label
      const seen = new Set()
      const unique = results.filter((r) => {
        const key = r.display_name.split(',')[0]
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

      setSearchResults(unique.slice(0, 6))
      setSearchLoading(false)
    }

    const id = setTimeout(run, 300)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [searchQuery, mapMode])

  // ---------------- CONFIRM TEMP LOCATION ----------------
  const confirmTemp = async () => {
    if (!tempPos) return alert('Pick a location first.')

    const name = await getAddress(tempPos.lat, tempPos.lng)

    if (mapMode === 'pickup') {
      setPickupPos(tempPos)
      setPickupArea(name)
    } else {
      setDropPos(tempPos)
      setDropArea(name)
    }

    setMapMode(null)
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* FULLSCREEN MAP */}
      {mapMode && (
        <div className='fixed inset-0 z-50 bg-white flex flex-col'>
          <div className='p-4 border-b flex gap-3'>
            <button
              onClick={() => setMapMode(null)}
              className='px-3 py-2 bg-gray-100 rounded'
            >
              Close
            </button>

            <div className='flex-1 relative'>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-3 py-2 border rounded'
                placeholder='Search location...'
              />

              {searchLoading && (
                <p className='text-xs text-gray-500 mt-1'>Searching...</p>
              )}

              {searchResults.length > 0 && (
                <div className='absolute bg-white border rounded mt-1 max-h-56 overflow-auto w-full z-50'>
                  {searchResults.map((item, i) => (
                    <div
                      key={i}
                      className='px-3 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => {
                        setTempPos({ lat: item.lat, lng: item.lon })
                        setSearchQuery(item.display_name)
                      }}
                    >
                      {item.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div ref={mapContainerRef} className='flex-1' />

          <div className='p-3 border-t bg-gray-50'>
            <button
              onClick={confirmTemp}
              className='w-full bg-blue-600 text-white py-2 rounded'
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className='max-w-4xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-10'>
        {/* PRICE CARD */}
        <div className='bg-blue-600 p-10 rounded-3xl text-center text-white shadow-lg'>
          <div className='text-7xl mb-6'>🧮</div>
          <div className='bg-white text-blue-600 px-6 py-3 rounded-xl shadow inline-block'>
            <p className='text-3xl font-bold'>
              ₹{result ? result.total : '50.00'}
            </p>
            <p className='text-xs text-gray-500'>Estimated Price</p>
          </div>
        </div>

        {/* FORM */}
        <div className='bg-gray-50 rounded-3xl p-8 shadow'>
          <label className='font-medium'>Pickup Location</label>
          <div
            onClick={() => setMapMode('pickup')}
            className='border px-4 py-3 rounded-lg bg-white cursor-pointer mt-1'
          >
            {pickupArea || 'Select Pickup Location'}
          </div>

          <div className='mt-4'>
            <label className='font-medium'>Drop Location</label>
            <div
              onClick={() => setMapMode('drop')}
              className='border px-4 py-3 rounded-lg bg-white cursor-pointer mt-1'
            >
              {dropArea || 'Select Drop Location'}
            </div>
          </div>

          <div className='mt-4'>
            <label>Weight (grams)</label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type='number'
              className='w-full border px-4 py-3 rounded-lg mt-1'
            />
          </div>

          <div className='mt-4'>
            <label>Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className='w-full border px-4 py-3 rounded-lg mt-1'
            >
              <option value=''>Select</option>
              <option value='cod'>Cash on Delivery</option>
              <option value='prepaid'>Prepaid</option>
            </select>
          </div>

          {previewDistance && (
            <p className='mt-4 text-sm text-gray-600'>
              Preview Distance: <strong>{previewDistance.toFixed(2)} km</strong>
            </p>
          )}

          <button
            onClick={handleSubmit}
            className='w-full bg-blue-600 text-white py-3 rounded-lg mt-4'
          >
            Submit
          </button>

          {result && (
            <div className='mt-6 bg-white border rounded p-4'>
              <h3 className='font-semibold mb-2'>Fare Breakdown</h3>
              <table className='text-sm w-full'>
                <tbody>
                  <tr>
                    <td>Pickup</td>
                    <td>{result.pickupArea}</td>
                  </tr>
                  <tr>
                    <td>Drop</td>
                    <td>{result.dropArea}</td>
                  </tr>
                  <tr>
                    <td>Distance</td>
                    <td>{result.distance} km</td>
                  </tr>
                  <tr>
                    <td>Base Fare</td>
                    <td>₹{result.baseFare}</td>
                  </tr>
                  <tr>
                    <td>Distance Fare</td>
                    <td>₹{result.distanceFare}</td>
                  </tr>
                  <tr>
                    <td>Weight Charges</td>
                    <td>₹{result.weightFare}</td>
                  </tr>
                  {result.codFare > 0 && (
                    <tr>
                      <td>COD Charges</td>
                      <td>₹{result.codFare}</td>
                    </tr>
                  )}
                  <tr className='border-t font-bold'>
                    <td>Total</td>
                    <td>₹{result.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
