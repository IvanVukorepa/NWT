
async function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const VoteService = {
    addVote: async function (postId, vote) {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            alert("You need to log in to perform this action");
            return;
        }

        await fetch('api/VoteController/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "postId": postId, "userId": user.userId, "vote": vote })
        }).then(await handleResponse);
    },
    editVote: async function (postId, vote) {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            alert("You need to log in to perform this action");
            return;
        }

        await fetch('api/VoteController/edit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "postId": postId, "userId": user.userId, "vote": vote })
        }).then(await handleResponse);
    }
};

export default VoteService;