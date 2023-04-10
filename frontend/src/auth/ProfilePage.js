import React from "react";


const ProfilePage = (props) => {
    return (
        <div>
            <h1>{props.token.user.email}</h1>
        </div>
    )
}


export default ProfilePage;