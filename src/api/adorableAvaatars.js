import axios from "axios";

const adorableUrl = "https://api.adorable.io/avatars/200/aa";
export const fetchAvatarsOffer = () => axios
    .get(adorableUrl)
    .then(({data: {results = {}}}) => results);

