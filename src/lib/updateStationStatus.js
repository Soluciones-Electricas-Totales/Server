import Station from "../models/Station.js";

export const updateStationStatus = async (stationId, inUse) => {
    const station = await Station.findByIdAndUpdate(
        stationId,
        { inUse },
        { new: true }
    );

    if (!station) {
        throw new Error('Estación no encontrada');
    }

    return station;
};
