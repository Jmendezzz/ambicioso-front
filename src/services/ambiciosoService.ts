
const apiUrl = 'http://localhost:5000';

export function getDiceNumber(): Promise<number> {
    return fetch(`${apiUrl}/get-score`).then((response) => response.json());
}