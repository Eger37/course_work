import {httpClient} from "./httpClient";
import {test1Data} from "../data/testsData";


export const testsProvider = {
    test1: ({test1Data, answers}) => {
        return httpClient("test1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({test_1_data: test1Data, answers: answers}),
        }).then(res => {
            if (res.status !== 200) {
                res.json().then((data) => {
                    alert(data.message)
                })
                return Promise.reject(res.status !== 200)
            } else {
                res.json().then((data) => {
                    alert("result")
                })
                return Promise.resolve()
            }
        }).catch(function () {
            console.log("error");
        });
    },
};
