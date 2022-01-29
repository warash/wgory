export const toKilometers = (meters) => {
    const rounded =  Math.round(meters /10) / 100;
    return `${rounded} km`;
};