import {httpClient} from "./httpClient";

export const postTest1 = ({userId, test1Data, answers}) => {
    return httpClient("test1", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id: userId, test_1_data: test1Data, answers: answers}),
    }).then(res => {
        if (res.status !== 200) {
            res.json().then((data) => {
                alert(data.message)
            })
            return Promise.reject(res.status !== 200)
        } else {
            return res.json()
        }
    }).catch(function () {
        console.log("error");
    });
};