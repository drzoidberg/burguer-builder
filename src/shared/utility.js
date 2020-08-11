export const updateObject = (oldObject, updatedObjectProperties) => {
    return {
        ...oldObject,
        ...updatedObjectProperties
    }
}