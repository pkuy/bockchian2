
export const loadContract = async (name) => {
    return fetch(`/contracts/${name}.json`)
        .then(res => res.json())
        .catch((err) => console.log(err))
}
