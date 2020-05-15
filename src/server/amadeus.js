const Amadeus = require('amadeus');

const amadeus = new Amadeus();
console.log(amadeus)

export const getAirportCitySearch = async (keyword) => {
    return await amadeus.referenceData.locations.get({
        keyword: keyword,
        subType: Amedeus.location.any
    })
}

export const getNearestAirports = async (lon, lat) => {
    return await amadeus.referenceData.locations.airports.get({
        longitude: lon,
        latitude: lat
    })
}

export const flightOfferSearch = async (org, des, date, travelers) => {
    return await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: org,
        destinationLocationCode: des,
        departureDate: date,
        adults: travelers
    })
}

export const hotelSearch = async (cityCode) => {
    return await amadeus.shopping.hotelOffers.get({
        cityCode: cityCode
    })
}

export const offersByHotel = async (hotelId) => {
    return await amadeus.shopping.hotelOffersByHotel.get({
        hotelId: hotelId
    })
}

export const hotelSentimentAnalysis = (hotelId) => {
    return await amadeus.eReputation.hotelSentiments.get({
        hotelIds: hotelId
    })
}


export const searchPointsOfInterest = (lon, lat) => {
    return await amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: lon
    })
}