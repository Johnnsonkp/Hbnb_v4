export function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export const parsedPlace = (listing) => {
  const data = {
    id: listing.id,
    title: listing.title || listing.name,
    url: listing.url,
    address: listing.address,
    amenities: listing.amenityIds,
    latitude: listing.lat,
    longitude: listing.lng,
    city: listing.city,
    price: listing.price?.rate || 0,
    description: listing.description,
    img: listing.images,
    bathrooms: listing.bathrooms || 0,
    bedrooms: listing.bedrooms || 0,
    beds: listing.beds || 0,
    type: listing.propertyType || listing.roomType || listing.type,
    userId: listing.userId || 0,
    hostThumbnail: listing.hostThumbnail || listing.host_thumbnail || listing.hostThumbnail || '',
    deeplink: listing.deeplink || '',
    superHost: listing.isSuperhost,
    rating: listing.rating || 5,
  }

  return data
}

export const parsedPlaces = (listings) => {
  let result = []

  listings && listings.map((listing) => {
    const data = {
      id: listing.id,
      title: listing.title || listing.name,
      url: listing.url,
      address: listing.address,
      amenities: listing.amenityIds,
      latitude: listing.latitude || listing.lat,
      longitude: listing.longitude || listing.lng,
      city: listing.city,
      price: listing.price || listing.price?.rate || 0,
      description: listing.description,
      img: listing.images,
      bathrooms: listing.bathrooms || '',
      bedrooms: listing.bedrooms || '',
      beds: listing.beds || '',
      type: listing.property_type || listing.roomType || listing.type,
      userId: listing.owner_id || listing.userId || '',
      hostThumbnail: listing.host_thumbnail || listing.hostThumbnail,
      deeplink: listing.deeplink || '',
      superHost: listing.super_host || listing.isSuperhost,
      rating: listing.rating || '',
    }

    result.push(data)
  })

  return result
}