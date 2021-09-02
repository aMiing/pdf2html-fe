import axios from "./axios";

const postPoint = () => {
    axios.get("/api/point?project=pdf2html");
};

export default postPoint;
